module.exports = class UserDto{
    email;
    username;
    id;
    favouritePokemons;
    constructor(model) {
        this.email = model.email;
        this.username = model.username;
        this.id = model._id;
        this.favouritePokemons = model.FavouritePokemons
    }
}