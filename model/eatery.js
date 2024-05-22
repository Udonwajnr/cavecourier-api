const mongoose = require("mongoose")
const eaterySchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: {
      type: String,
      required: true
    },
    contact: {
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    },
    cuisine: {
      type: String,
      required: true
    },
    // opening_hours: {
    //   monday: {
    //     type: String,
    //     required: true
    //   },
    //   tuesday: {
    //     type: String,
    //     required: true
    //   },
    //   wednesday: {
    //     type: String,
    //     required: true
    //   },
    //   thursday: {
    //     type: String,
    //     required: true
    //   },
    //   friday: {
    //     type: String,
    //     required: true
    //   },
    //   saturday: {
    //     type: String,
    //     required: true
    //   },
    //   sunday: {
    //     type: String,
    //     required: true
    //   }
    // },
    rating: {
      type: Number,
      required: false,
      default: 0
    },
    menu: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem'
    }],
    categories: [{
      type: mongoose.Types.ObjectId,
      ref: 'Category'
  }],
    image: {
      type: String,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  eaterySchema.index({ location: '2dsphere' });
  module.exports = mongoose.model('Eatery', eaterySchema);
  
  // const YourModel =mongoose.model('Eatery', eaterySchema);
  
//   const removeFieldFromDocuments = async () => {
//     try {
//         const result = await YourModel.updateMany(
//             {},
//             { $unset: { fieldName: "category" } }
//         );
//         console.log(`${result.nModified} documents were updated`);
//     } catch (err) {
//         console.error('Error removing field:', err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// removeFieldFromDocuments();