// load the Todo model
var TodoAdapter   = require('./models/todo');
var TradeAdapter  = require('./models/trade');

module.exports = function(app) {

  /* TODO ROUTES */
  
  
  app.get('/api/todos', function(req, res) {
    TodoAdapter.find(function(err, todos){
      if(err)
        res.send(err);
      res.json(todos);
    });
  });

  app.post('/api/todos', function(req, res) {
    TodoAdapter.create({
      text	: req.body.text,
      done	: false
    }, function(err, todo){
      if (err) 
        res.send(err);

      TodoAdapter.find(function(err, todos) {
        if(err)
          res.send(err)
        
        console.log('daklfjd');
        res.json(todos);

      });
    });
  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    TodoAdapter.remove({
      _id:req.params.todo_id
    }, function(err, todo) {
      if(err)
        res.send(err);
      TodoAdapter.find(function(err, todos) {
        if(err)
          res.send(err);
        res.json(todos);
      });
    });
  });
  
  

  app.get('/api/trades', function(req, res) {
    TradeAdapter.find(function(err, trades) {
      if(err) {
        res.send(err);
        console.log('err:' + err);
      }
      res.json(trades);
      //console.log('data showed:' + trades);
      /*
      TradeAdapter.create({
        position: false,
        ticker: 'KKKK',
        quantity:20,
        price:120000,
        margin:0.5
      });
*/
    });
  });

  app.post('/api/trades', function(req, res) {
    TradeAdapter.create({
      date    : req.body.date,
      position: req.body.position,
      ticker  : req.body.ticker,
      margin  : req.body.margin,
      quantity: req.body.quantity,
      price   : req.body.price,
      fee     : req.body.fee,
      tax     : req.body.tax
    }), function(err, todo){
      if (err) 
        res.send(err);

      TradeAdapter.find(function(err, todos) {
        if(err)
          res.send(err)
        
        res.json(todos);
      });
    };
  });


  app.delete('/api/trades/:trade_id', function(req, res) {
    TradeAdapter.remove({
      _id:req.params.trade_id
    }, function(err, trade) {
      if(err)
        res.send(err);
      TradeAdapter.find(function(err, trades) {
        if(err)
          res.send(err);
        res.json(trades);
      });
    });
  });

  /****** Application **********/
  app.get('/todos', function(req, res) {
  // load the single view file (angualar will handle the page changes on the front-end)
    res.sendfile('./public/index.html');
  });

  app.get('/trades', function(req, res) {
    res.sendfile('./public/transaction.html');
  });
};
