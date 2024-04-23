class UsersService {

    constructor({ User }) {
        this.User = User;
    }

    async createUser(userData) {
        const _user = await this.User.findOne({
                email: userData.email
        });
        
        if (_user) {
            return {
                message: 'A user with this email already exists'
            };
        } else {
            await this.User.create(userData);
            return {
                message: 'User created successfully !',
                user: userData,
            };
        }
    }

    async updateUser(userId, userData) {
        const _user = await this.User.findByIdAndUpdate(userId, userData, { new: true });

        if (_user) {
            return {
                message: 'User successfully updated!',
                user: _user,
            };
        }

        return {
            message: 'User not found !',
        };
    }

    async deleteUser(userId) {
        const _user = await this.User.findByIdAndDelete(userId);

        if (_user) {
            return {
                message: 'User deleted successfully !',
            };
        }

        return {
            messsage: 'User not found !',
        };
    }

    async listAllUsers({ page = 1, limit = 10, search = '' }) {
        let query = {};
        if (search) {    
            query = {
                $or: [
                    { fullname: { $regex: search, $options: 'i' } },
                    { job: { $regex: search, $options: 'i' } },
                    { role: { $regex: search, $options: 'i' } },
                ],
            };
        }

        const _users = await this.User.find(query)
        .limit(limit)
        .skip((page - 1) * limit);

        const _total = await this.User.countDocuments(query);

        return {
            message: 'List of all users !',
            users: _users,
            total: _total,
            totalPages: Math.ceil(_total / limit),
            currentPage: page,
            limit: limit,
        };
    }

    async login(userData) {
        const _user = await this.User.findOne({
            
                email:userData.email
            
        })
            if (_user){
               let isPasswordValid = _user.comparePassword(userData.password)

               if (isPasswordValid){

                return {
                    message:'User is connected'
                }
               }
               else {
                return {
                    message:'User Credentials are not corret !'
                }
               }
            } else {
                return {
                message: 'User doesnt exist',
                };
            }
        }
}

module.exports = UsersService;