const repository = require('../repositories/user')

exports.index = async (_, res) => {
  try {
    const users = await repository.get()

    return res.status(200).json({users})
  } catch(error) {
    return res.status(500).json({error})
  }
}

exports.post = async (req, res) => {
  try {
    await repository.post(req.body.values)

    return res.status(201).json({
      message: 'User created successfully.'
    })
  } catch (error) {
    return res.status(500).json({error})
  }
}

exports.getById = async (req, res) => {
  try {
    const user = await repository.get(req.params.id)

    return res.status(200).json({user})
  } catch (error) {
    return res.status(500).json({error})
  }
}

// exports.update = async (req, res) => {
//   const {id} = req.params
//   const {name, email, password} = req.body

//   console.log(name, email, id)

//   try {
//     await repository.put({name, email, password}, id)

//     return res.status(200).json({message: 'User updated successfully.'})
//   } catch(error) {
//     return res.status(500).json({error})
//   }
// }

// exports.delete = async (req, res) => {
//   const {id} = req.params

//   try {
//     await repository.delete(id)

//     return res.status(200).json({message: 'User deleted successfully.'})
//   } catch(error) {
//     return res.status(500).json({error})
//   }
// }

