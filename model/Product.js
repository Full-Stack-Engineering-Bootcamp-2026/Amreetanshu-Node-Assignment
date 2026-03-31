const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    Product.fetchAll((products) => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]); 
      }
      cb(JSON.parse(fileContent));
    });
  }

  static findById(id, cb) {
    this.fetchAll((products) => {
      const product = products.find((p) => p.id === id);
      cb(product); 
    });
  }
}

module.exports = Product;