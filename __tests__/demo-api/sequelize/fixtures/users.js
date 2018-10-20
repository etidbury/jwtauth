
module.exports = async ({
    model,
    sequelize
}) => {
    
    const users = await Promise.all(
        [
            {
                username: 'foo'
            },
            {
                username: 'bar'
            }
        ].map(
            user => model('User').create(user)
        )
    )
    
}