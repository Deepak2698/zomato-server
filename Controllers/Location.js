// import the Location Model to work with
const Location = require('../Models/Location');

// functionalities for the location controller
// to talk to the database

exports.getLocations = (req, res) => {
    Location.find()
        .then(result => {
            const dummy =[
                {name: "pune",
                    city_id: 1,
                    location_id:1,
                    city: 'pune',
                    country_name: 'India'
                }
            ]
            res.status(200).json({
                message: "Locations fetched",
                locations: result
            });
        })
        .catch(error => {
            // console.log('====================================');
            // console.log("Error fetching locations:", error);  // More specific error log
            // console.log('====================================');
            res.status(500).json({
                message: "Error in Database",
                error: error
            });
        });
};

exports.addNewLocation = (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: "Request body is empty or missing" });
    }

    const locationObj = new Location(data);

    locationObj.save()
        .then(result => {
            console.log("New Location Added:", result);
            res.status(201).json({ message: "Location added successfully", location: result });
        })
        .catch(error => {
            console.error("Error saving location:", error);
            res.status(500).json({ message: "Error in Database", error });
        });
};




