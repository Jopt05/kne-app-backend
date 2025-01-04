const baseConfigs = {
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] }
    }
}

module.exports = {
    baseConfigs
}