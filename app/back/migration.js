const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = `${process.env.MONGODB_URI}`;

mongoose.connect(dbURI)
    .then(() => {
        console.log('Database connection successful');

        const addressSchema = new mongoose.Schema({
            key: String,
            label: String,
            lat: Number,
            lon: Number,
            location: {
                type: { type: String, default: 'Point' },
                coordinates: [Number]
            }
        }, { collection: 'address' });

        const Address = mongoose.model('Address', addressSchema);

        const batchSize = 1000; // Taille du lot
        let processed = 0;

        function updateBatch(skip) {
            Address.find({ location: { $exists: false } })
                .skip(skip)
                .limit(batchSize)
                .then(addresses => {
                    if (addresses.length === 0) {
                        console.log('Migration completed');
                        mongoose.connection.close();
                        return;
                    }

                    const updates = addresses.map(address => {
                        address.location = {
                            type: 'Point',
                            coordinates: [address.lon, address.lat]
                        };
                        return address.save();
                    });

                    Promise.all(updates)
                        .then(() => {
                            processed += addresses.length;
                            console.log(`${processed} addresses updated`);
                            updateBatch(skip + batchSize);
                        })
                        .catch(err => {
                            console.error('Error updating addresses:', err);
                            mongoose.connection.close();
                        });
                });
        }

        updateBatch(0);
    })
    .catch(err => console.error('Database connection error:', err));
