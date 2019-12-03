module.exports =function(req,res,next){
	res.locals.passing={};
	if(!req.session.passing) return next();
	res.locals.passing = _.clone(req.session.passing);
	req.session.passing={};
	next();
}