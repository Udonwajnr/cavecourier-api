const asyncHandler = require("express-async-handler")
const DispatchRider = require("../model/dispatchRider")

const getDispatchRiders = asyncHandler(async (req, res) => {
    const dispatchRiders = await DispatchRider.find();
    res.status(200).json(dispatchRiders);
  });

const getDispatchRiderById = asyncHandler(async (req, res) => {
    const dispatchRider = await DispatchRider.findById(req.params.id);
    if (dispatchRider) {
        res.status(200).json(dispatchRider);
    } else {
        res.status(404).json({ message: 'Dispatch Rider not found' });
    }
});

const createDispatchRider = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, vehicleDetails, status, location } = req.body;
  
  const dispatchRider = new DispatchRider({
    name,
    email,
    phoneNumber,
    vehicleDetails,
    status,
    location,
  });

  await dispatchRider.save();
  res.status(201).json({ message: 'Dispatch Rider created successfully', dispatchRider });

  });

  const updateDispatchRider = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, vehicleDetails, status, location } = req.body;
    const dispatchRider = await DispatchRider.findById(req.params.id);

    if (dispatchRider) {
      dispatchRider.name = name || dispatchRider.name;
      dispatchRider.email = email || dispatchRider.email;
      dispatchRider.phoneNumber = phoneNumber || dispatchRider.phoneNumber;
      dispatchRider.vehicleDetails = vehicleDetails || dispatchRider.vehicleDetails;
      dispatchRider.status = status || dispatchRider.status;
      dispatchRider.location = location || dispatchRider.location;
      dispatchRider.updatedAt = Date.now();
      
      await dispatchRider.save();
      res.status(200).json({ message: 'Dispatch Rider updated successfully', dispatchRider });
    } else {
      res.status(404).json({ message: 'Dispatch Rider not found' });
    }
  });
  

const deleteDispatchRider = asyncHandler(async (req, res) => {
    const dispatchRider = await DispatchRider.findById(req.params.id);
    if (dispatchRider) {
      await DispatchRider.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Dispatch Rider deleted successfully' });
    } else {
      res.status(404).json({ message: 'Dispatch Rider not found' });
    }
  });


module.exports = {getDispatchRiderById,getDispatchRiders,createDispatchRider,updateDispatchRider,deleteDispatchRider}