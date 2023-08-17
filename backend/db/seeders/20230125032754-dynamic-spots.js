'use strict';



/** @type {import('sequelize-cli').Migration} */
const { User, Spot } = require('../models')

//Randomly select users
const randomUser = () => {

  const users = ['Ironman', 'Black-Panther', 'Captain-America']
  const ranIdx = Math.floor(Math.random() * users.length)

  return users[ranIdx]
}

//Randomly select price
const randomPrice = () => {
  
  //min max prices
  const min = 100
  const max = 1500

  const ranPrice = Math.random() * (max - min) + min 

  const price = ranPrice.toFixed(2)

  return price
}

const spots = [
  //1 !
  {
    username: randomUser(),
    spot:{
      address: "123 Rocky Dr",
      city: "Bear Mountain",
      state: "Colorado",
      country: "United States of America",
      lat: 40.7645358,
      lng: 74.4730327,
      name: "Home by the Clouds",
      description: "Clouds lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //2 !
  {
    username: randomUser(),
    spot:{
      address: "123 Rural Retreat St",
      city: "Snowdonia",
      state: "Wales",
      country: "United Kingdom",
      lat: 1.7645358,
      lng: 37.4730327,
      name: "Rural Retreat",
      description: "Rural retreat lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //3 !
  {
    username: randomUser(),
    spot: {
      address: "123 Modern Retreat St",
      city: "Macedon Ranges",
      state: "Victia",
      country: "Australia",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Modern Style in Nature",
      description: "Modern lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //4
  {
    username: randomUser(),
    spot: {
      address: "123 Snowy Drive",
      city: "Chalot",
      state: "Quebec",
      country: "Canada",
      lat: 1.7645358,
      lng: 37.4730327,
      name: "Ski Haven",
      description: "Ski lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //5
  {
    username: randomUser(),
    spot: {
      address: " 123 Swiss Lane",
      city: "Uetliberg",
      state: "Zurich",
      country: "Switzerland",
      lat: 0,
      lng: 0,
      name: "Lakeview Paradise",
      description: "Lake lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //6
  {
    username: 'Ironman',
    spot: {
      address: " 123 Sunny Dr",
      city: "City Beach",
      state: "Perth",
      country: "Australia",
      lat: 0,
      lng: 0,
      name: "Beach Vibes",
      description: "Perth lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //7
  {
    username: 'Captain-America',
    spot: {
      address: "456 Snowy Way",
      city: "Kolsstaðir",
      state: "Kolsstaðir",
      country: "Iceland",
      lat: 0,
      lng: 0,
      name: "Aurora Cabin",
      description: "Borealis lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //8
  {
    username: 'Black-Panther',
    spot: {
      address: "456 Mountain Way",
      city: "Cape Town",
      state: "Cape Town",
      country: "South Africa",
      lat: 0,
      lng: 0,
      name: "Mountain Luxury",
      description: "Cape lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //9
  {
    username: 'Black-Panther',
    spot: {
      address: "456 Romeo Way",
      city: "Vittoriosa",
      state: "Valleta",
      country: "Malta",
      lat: 0,
      lng: 0,
      name: "Classical Villa",
      description: "Juliet lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //10
  {
    username: 'Captain-America',
    spot: {
      address: "123 Queen Path",
      city: "Queenstown",
      state: "South Island",
      country: "New Zealand",
      lat: 0,
      lng: 0,
      name: "Hill Residence",
      description: "Zealand lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //11
  {
    username: 'Ironman',
    spot: {
      address: "123 Viñeda Road",
      city: "Ronda",
      state: "Andalusia",
      country: "Spain",
      lat: 0,
      lng: 0,
      name: "Viña Villa",
      description: "Uva lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //12
  {
    username: 'Captain-America',
    spot: {
      address: "123 Maple Road",
      city: "Banff",
      state: "Alberta",
      country: "Canada",
      lat: 0,
      lng: 0,
      name: "Rustic Mountains",
      description: "Poutine lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //13
  {
    username: 'Black-Panther',
    spot: {
      address: "123 Makai Road",
      city: "Maui",
      state: "Hawaii",
      country: "USA",
      lat: 0,
      lng: 0,
      name: "Nani Resort",
      description: "Aloha lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //14
  {
    username: randomUser(),
    spot: {
      address: "123 Town Road",
      city: "Bergen",
      state: "Vestland",
      country: "Norway",
      lat: 0,
      lng: 0,
      name: "Blue Beauty",
      description: "Forest lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //15
  {
    username: randomUser(),
    spot: {
      address: "123 Oso Road",
      city: "Big Bear",
      state: "California",
      country: "USA",
      lat: 0,
      lng: 0,
      name: "Cabin Remedy",
      description: "Lake lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //16
  {
    username: randomUser(),
    spot: {
      address: "123 Playa Road",
      city: "La Libertad",
      state: "La Libertad",
      country: "El Salvador",
      lat: 0,
      lng: 0,
      name: "Playa de Vida",
      description: "Beach lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //17
  {
    username: randomUser(),
    spot: {
      address: "123 Viking Road",
      city: "Reykjavik",
      state: "Reykjavik",
      country: "Iceland",
      lat: 0,
      lng: 0,
      name: "Forest Escape",
      description: "Greenery lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //18
  {
    username: randomUser(),
    spot: {
      address: "123 Oasis Road",
      city: "Namib Desert",
      state: "Lüderitz",
      country: "Iceland",
      lat: 0,
      lng: 0,
      name: "Desert Oasis",
      description: "Sand lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //19
  {
    username: randomUser(),
    spot: {
      address: "123 Villa Road",
      city: "Marina Grande",
      state: "Marina Grande",
      country: "Italy",
      lat: 0,
      lng: 0,
      name: "Villa Sagittario",
      description: "Cliff lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },
  //20
  {
    username: randomUser(),
    spot: {
      address: "123 Alps Road",
      city: "Rhône-Alpes",
      state: "Rhône-Alpes",
      country: "France",
      lat: 0,
      lng: 0,
      name: "French Winter",
      description: "Snow lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
      price: randomPrice()
    }
  },

]


module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < spots.length; i++){

      //Get user and spot from spots arr
      const {username, spot} = spots[i]

      //Get user from db
      const owner = await User.findOne({ where: { username } })

      //Create spot
      await Spot.create({...spot, ownerId: owner.id})
    }


  },

  async down(queryInterface, Sequelize) {

    for (let i = 0; i < spots.length; i++){

      //Get user and spot from spots arr
      const {username, spot} = spots[i]

      //Get user from db
      const owner = await User.findOne({ where: { username } })

      //Create spot
      await Spot.destroy({ where: { name: spot.name} })
    }
  }
};
