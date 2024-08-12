module.exports = (req, res, next) => {
    res.errorResponse(404, 'API not found');
};