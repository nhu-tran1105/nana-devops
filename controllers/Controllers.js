import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

export const getAllItems = async (req, res, collectionName) => {
  try {
    const db = getDB();
    const items = await db.collection(collectionName).find({}).toArray();
    
    console.log(`✅ MongoDB: Found ${items.length} items in collection '${collectionName}'.`);
    res.status(200).json(items);
  } catch (error) {
    console.error(`❌ Error fetching ${collectionName}:`, error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};

/**
 * CREATE 
 */
export const createItem = async (req, res, collectionName) => {
  try {
    const db = getDB();
    const newItem = {
      ...req.body,
      createdAt: new Date() 
    };
    
    const result = await db.collection(collectionName).insertOne(newItem);
    console.log(`✅ Created item in ${collectionName} with ID: ${result.insertedId}`);
    
    res.status(201).json({
      message: 'Created successfully!',
      id: result.insertedId
    });
  } catch (error) {
    console.error(`❌ Error creating ${collectionName}:`, error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

/**
 * UPDATE 
 */
export const updateItem = async (req, res, collectionName) => {
  try {
    const { id } = req.params;
    const db = getDB();
    
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...req.body, 
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Updated successfully!' });
  } catch (error) {
    console.error(`❌ Error updating ${collectionName}:`, error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

/**
 * DELETE 
 */
export const deleteItem = async (req, res, collectionName) => {
  try {
    const { id } = req.params;
    const db = getDB();
    
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Deleted successfully!' });
  } catch (error) {
    console.error(`❌ Error deleting ${collectionName}:`, error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};