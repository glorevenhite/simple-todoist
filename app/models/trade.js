var mongoose = require('mongoose');

module.exports = mongoose.model('Trade', {
	date		: Date,
	position	: Boolean,
	ticker	 	: String,
	margin 		: Number,	
	quantity	: Number,
	price		: Number,
	fee			: Number,
	tax			: Number	
});

