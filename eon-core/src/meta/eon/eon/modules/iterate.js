/*
@function iterate
@description 
@param {Array} iterable
@param {Number} batch
@param {Number} delay
*/
eon.iterate = function (iterable, batch, delay, callback) {
  batch = batch || iterable.length;

  if (batch == 0) {
    batch = iterable.length;
  }

  var current = 0;
  var nextCount = 0;
  var doneCount = 0;

  var done = function () {
    doneCount++;
    if (doneCount == batch) {
      if (delay != null) {
        setTimeout(function () {
          nextCount = 0;
          doneCount = 0;
          next();
        }, delay);
      } else {
        nextCount = 0;
        doneCount = 0;
        next();
      }
    }
  };

  var next = function () {
    if (current < iterable.length) {
      if (nextCount < batch) {
        var e = iterable[current];
        current++;
        nextCount++;
        e.run(done);
        next();
      }
    }else{
      if(callback){
        callback();
      }
    }
  };

  next();
};