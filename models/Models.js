// --- Models.js: Defines the data structure for our Quebec records ---

class Models {
    constructor(title, issuer, year, icon) {
        this.title = title;
        this.issuer = issuer;
        this.year = year;
        this.icon = icon;
   
    }
}
// We export the Models class so it can be imported and used in our controller to create new records.
export default Models;
