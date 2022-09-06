// ############################## Helper functions ##############################
// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
  $(".slide").hide();
  // Show just the slide we want to show
  $("#"+id).show();
}

// Get random integers.
// When called with no arguments, it returns either 0 or 1. When called with one argument, *a*, it returns a number in {*0, 1, ..., a-1*}. When called with two arguments, *a* and *b*, returns a random value in {*a*, *a + 1*, ... , *b*}.
function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

// Remove Option Redundancy
function options() {
  var ages = document.getElementById("age");
  var max  = 90;
  for (i = 18; i < max; i++) {
    var option = new Option(String(i), i);
    ages.options.add(option);
  }
}

// Add a random selection function to all arrays (e.g., <code>[4,8,7].random()</code> could return 4, 8, or 7). This is useful for condition randomization.
Array.prototype.random = function() {
  return this[random(this.length)];
}

// shuffle ordering of argument array -- are we missing a parenthesis?
//function shuffle (a)
//{
//    var o = [];
//
//    for (var i=0; i < a.length; i++) {
//      o[i] = a[i];
//    }
//
//    for (var j, x, i = o.length;
//         i;
//         j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
//    return o;
//}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// Select 20 Random Trials, one from each context, 2 from each control, 4 from each experimental
function randomTrials(trials){
  var types = ["1_A", "1_S", "2_A", "2_S", "3_A", "3_A", "3_S", "3_S", "4_A", "4_A",
              "4_S", "4_S", "5_A", "5_A", "5_S", "5_S", "6_A", "6_A", "6_S", "6_S"];

  var shuf = shuffle(types);
  var output = [];

  for (i = 0; i < 20; i++) {
    var type_alt = shuf[i].split('_');
    var trialString = "T" + type_alt[0];
    var trial = trials[trialString];

    var keyString = trialString + "_C" + (i + 1) + "_" + type_alt[1];

    output.push(trial[keyString]);
  }

  return shuffle(output);
}

// //Track Slider!
// document.addEventListener('DOMContentLoaded',function() {
//     document.getElementsByName('slider3')[0].onchange=changeEventHandler;
//     document.getElementsByName('slider4')[0].onchange=changeEventHandler;
// },false);

// function changeEventHandler(event) {
//     response_logged = true;
// }

// from: http://www.sitepoint.com/url-parameters-jquery/
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
    return null;
  } else{
    return results[1] || 0;
  }
}

// -------------------------- Conditions and Trial Order -----------------------------------//

var trials = {
    // training: ["training_dog_animal","dog.jpg", "There is an animal!", "X.A"],
    T1: {T1_C1_A: ["T1_C1_A", "Sam and Alex are searching for the keys.",
                    "Alex thinks that the keys are in the drawer.", "Sam thinks that the keys are in the drawer."],
        T1_C1_S: ["T1_C1_S", "Sam and Alex are searching for the keys.",
                    "Alex thinks that the keys are in the drawer.", "Sam thinks that the keys are in the drawer."],
        T1_C2_A: ["T1_C2_A", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T1_C2_S: ["T1_C2_S", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T1_C3_A: ["T1_C3_A", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones is a spy.", "Sam thinks that Jones is a spy."],
        T1_C3_S: ["T1_C3_S", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones is a spy.", "Sam thinks that Jones is a spy."],
        T1_C4_A: ["T1_C4_A", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it is raining in Shanghai", "Sam thinks that it is raining in Shanghai."],
        T1_C4_S: ["T1_C4_S", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it is raining in Shanghai", "Sam thinks that it is raining in Shanghai."],
        T1_C5_A: ["T1_C5_A", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose ate the cookies", "Sam thinks that Jose ate the cookies."],
        T1_C5_S: ["T1_C5_S", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose ate the cookies", "Sam thinks that Jose ate the cookies."],
        T1_C6_A: ["T1_C6_A", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria knows how to ride a horse.", "Sam thinks that Maria knows how to ride a horse."],
        T1_C6_S: ["T1_C6_S", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria knows how to ride a horse.", "Sam thinks that Maria knows how to ride a horse."],
        T1_C7_A: ["T1_C7_A", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith is dead.", "Sam thinks that Smith is dead."],
        T1_C7_S: ["T1_C7_S", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith is dead.", "Sam thinks that Smith is dead."],
        T1_C8_A: ["T1_C8_A", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there is beer in the fridge.", "Sam thinks that there is beer in the fridge."],
        T1_C8_S: ["T1_C8_S", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there is beer in the fridge.", "Sam thinks that there is beer in the fridge."],
        T1_C9_A: ["T1_C9_A", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus snowboards.", "Sam thinks that Tyrus snowboards."],
        T1_C9_S: ["T1_C9_S", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus snowboards.", "Sam thinks that Tyrus snowboards."],
        T1_C10_A: ["T1_C10_A", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin came up heads.", "Sam thinks that the coin came up heads."],
        T1_C10_S: ["T1_C10_S", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin came up heads.", "Sam thinks that the coin came up heads."],
        T1_C11_A: ["T1_C11_A", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill will arrive late.", "Sam thinks that the bill will arrive late."],
        T1_C11_S: ["T1_C11_S", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill will arrive late.", "Sam thinks that the bill will arrive late."],
        T1_C12_A: ["T1_C12_A", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima is pregnant.", "Sam thinks that Fatima is pregnant."],
        T1_C12_S: ["T1_C12_S", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima is pregnant.", "Sam thinks that Fatima is pregnant."],
        T1_C13_A: ["T1_C13_A", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene passed the class.", "Sam thinks that Rene passed the class."],
        T1_C13_S: ["T1_C13_S", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene passed the class.", "Sam thinks that Rene passed the class."],
        T1_C14_A: ["T1_C14_A", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast is done.", "Sam thinks that the roast is done."],
        T1_C14_S: ["T1_C14_S", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast is done.", "Sam thinks that the roast is done."],
        T1_C15_A: ["T1_C15_A", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner is ready.", "Sam thinks that dinner is ready."],
        T1_C15_S: ["T1_C15_S", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner is ready.", "Sam thinks that dinner is ready."],
        T1_C16_A: ["T1_C16_A", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting is at noon.", "Sam thinks that the meeting is at noon."],
        T1_C16_S: ["T1_C16_S", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting is at noon.", "Sam thinks that the meeting is at noon."],
        T1_C17_A: ["T1_C17_A", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it is sunny in Sacramento.", "Sam thinks that it is sunny in Sacramento."],
        T1_C17_S: ["T1_C17_S", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it is sunny in Sacramento.", "Sam thinks that it is sunny in Sacramento."],
        T1_C18_A: ["T1_C18_A", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander has an ace in his hand.", "Sam thinks that Xander has an ace in his hand."],
        T1_C18_S: ["T1_C18_S", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander has an ace in his hand.", "Sam thinks that Xander has an ace in his hand."],
        T1_C19_A: ["T1_C19_A", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food is pizza.", "Sam thinks that Starr's favorite food is pizza."],
        T1_C19_S: ["T1_C19_S", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food is pizza.", "Sam thinks that Starr's favorite food is pizza."],
        T1_C20_A: ["T1_C20_A", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story is true.", "Sam thinks that Chen's story is true."],
        T1_C20_S: ["T1_C20_S", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story is true.", "Sam thinks that Chen's story is true."],},

    T2: {T2_C1_A: ["T2_C1_A", "Sam and Alex are searching for the keys.",
                    "Alex thinks that the keys are in the drawer.", "Sam thinks that the keys aren't in the drawer."],
        T2_C1_S: ["T2_C1_S", "Sam and Alex are searching for the keys.",
                        "Alex thinks that the keys aren't in the drawer.", "Sam thinks that the keys are in the drawer."],
        T2_C2_A: ["T2_C2_A", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam isn't in Barcelona."],
        T2_C2_S: ["T2_C2_S", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam isn't in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T2_C3_A: ["T2_C3_A", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones is a spy.", "Sam thinks that Jones is not a spy."],
        T2_C3_S: ["T2_C3_S", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones is not a spy.", "Sam thinks that Jones is a spy."],
        T2_C4_A: ["T2_C4_A", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it is raining in Shanghai", "Sam thinks that it isn't raining in Shanghai."],
        T2_C4_S: ["T2_C4_S", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it isn't raining in Shanghai", "Sam thinks that it is raining in Shanghai."],
        T2_C5_A: ["T2_C5_A", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose ate the cookies", "Sam thinks that Jose didn't eat the cookies."],
        T2_C5_S: ["T2_C5_S", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose didn't eat the cookies", "Sam thinks that Jose ate the cookies."],
        T2_C6_A: ["T2_C6_A", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria knows how to ride a horse.", "Sam thinks that Maria doesn't know how to ride a horse."],
        T2_C6_S: ["T2_C6_S", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria doesn't know how to ride a horse.", "Sam thinks that Maria knows how to ride a horse."],
        T2_C7_A: ["T2_C7_A", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith is dead.", "Sam thinks that Smith isn't dead."],
        T2_C7_S: ["T2_C7_S", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith isn't dead.", "Sam thinks that Smith is dead."],
        T2_C8_A: ["T2_C8_A", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there is beer in the fridge.", "Sam thinks that there isn't any beer in the fridge."],
        T2_C8_S: ["T2_C8_S", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there isn't any beer in the fridge.", "Sam thinks that there is beer in the fridge."],
        T2_C9_A: ["T2_C9_A", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus snowboards.", "Sam thinks that Tyrus doesn't snowboard."],
        T2_C9_S: ["T2_C9_S", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus doesn't snowboard.", "Sam thinks that Tyrus snowboards."],
        T2_C10_A: ["T2_C10_A", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin came up heads.", "Sam thinks that the coin didn't come up heads."],
        T2_C10_S: ["T2_C10_S", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin didn't come up heads.", "Sam thinks that the coin came up heads."],
        T2_C11_A: ["T2_C11_A", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill will arrive late.", "Sam thinks that the bill won't arrive late."],
        T2_C11_S: ["T2_C11_S", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill won't arrive late.", "Sam thinks that the bill will arrive late."],
        T2_C12_A: ["T2_C12_A", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima is pregnant.", "Sam thinks that Fatima isn't pregnant."],
        T2_C12_S: ["T2_C12_S", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima isn't pregnant.", "Sam thinks that Fatima is pregnant."],
        T2_C13_A: ["T2_C13_A", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene passed the class.", "Sam thinks that Rene didn't pass the class."],
        T2_C13_S: ["T2_C13_S", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene didn't pass the class.", "Sam thinks that Rene passed the class."],
        T2_C14_A: ["T2_C14_A", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast is done.", "Sam thinks that the roast isn't done."],
        T2_C14_S: ["T2_C14_S", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast isn't done.", "Sam thinks that the roast is done."],
        T2_C15_A: ["T2_C15_A", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner is ready.", "Sam thinks that dinner isn't ready."],
        T2_C15_S: ["T2_C15_S", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner isn't ready.", "Sam thinks that dinner is ready."],
        T2_C16_A: ["T2_C16_A", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting is at noon.", "Sam thinks that the meeting isn't at noon."],
        T2_C16_S: ["T2_C16_S", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting isn't at noon.", "Sam thinks that the meeting is at noon."],
        T2_C17_A: ["T2_C17_A", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it is sunny in Sacramento.", "Sam thinks that it's not sunny in Sacramento."],
        T2_C17_S: ["T2_C17_S", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it's not sunny in Sacramento.", "Sam thinks that it is sunny in Sacramento."],
        T2_C18_A: ["T2_C18_A", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander has an ace in his hand.", "Sam thinks that Xander doesn't have an ace in his hand."],
        T2_C18_S: ["T2_C18_S", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander doesn't have an ace in his hand.", "Sam thinks that Xander has an ace in his hand."],
        T2_C19_A: ["T2_C19_A", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food is pizza.", "Sam thinks that Starr's favorite food isn't pizza."],
        T2_C19_S: ["T2_C19_S", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food isn't pizza.", "Sam thinks that Starr's favorite food is pizza."],
        T2_C20_A: ["T2_C20_A", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story is true.", "Sam thinks that Chen's story isn't true."],
        T2_C20_S: ["T2_C20_S", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story isn't true.", "Sam thinks that Chen's story is true."],},

    T3: {T3_C1_A: ["T3_C1_A", "Sam and Alex are searching for the keys.",
                    "Alex thinks that the keys are in the drawer.", "Sam thinks that the keys might be in the drawer."],
        T3_C1_S: ["T3_C1_S", "Sam and Alex are searching for the keys.",
                        "Alex thinks that the keys might be in the drawer.", "Sam thinks that the keys are in the drawer."],
        T3_C2_A: ["T3_C2_A", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam might be in Barcelona."],
        T3_C2_S: ["T3_C2_S", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam might be in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T3_C3_A: ["T3_C3_A", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones is a spy.", "Sam thinks that Jones might be a spy."],
        T3_C3_S: ["T3_C3_S", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones might be a spy.", "Sam thinks that Jones is a spy."],
        T3_C4_A: ["T3_C4_A", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it is raining in Shanghai", "Sam thinks that it might be raining in Shanghai."],
        T3_C4_S: ["T3_C4_S", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it might be raining in Shanghai", "Sam thinks that it is raining in Shanghai."],
        T3_C5_A: ["T3_C5_A", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose ate the cookies", "Sam thinks that Jose might have eaten the cookies."],
        T3_C5_S: ["T3_C5_S", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose might have eaten the cookies", "Sam thinks that Jose ate the cookies."],
        T3_C6_A: ["T3_C6_A", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria knows how to ride a horse.", "Sam thinks that Maria might know how to ride a horse."],
        T3_C6_S: ["T3_C6_S", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria might know how to ride a horse.", "Sam thinks that Maria knows how to ride a horse."],
        T3_C7_A: ["T3_C7_A", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith is dead.", "Sam thinks that Smith might be dead."],
        T3_C7_S: ["T3_C7_S", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith might be dead.", "Sam thinks that Smith is dead."],
        T3_C8_A: ["T3_C8_A", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there is beer in the fridge.", "Sam thinks that there might be beer in the fridge."],
        T3_C8_S: ["T3_C8_S", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there might be beer in the fridge.", "Sam thinks that there is beer in the fridge."],
        T3_C9_A: ["T3_C9_A", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus snowboards.", "Sam thinks that Tyrus might snowboard."],
        T3_C9_S: ["T3_C9_S", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus might snowboard.", "Sam thinks that Tyrus snowboards."],
        T3_C10_A: ["T3_C10_A", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin came up heads.", "Sam thinks that the coin might have come up heads."],
        T3_C10_S: ["T3_C10_S", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin might have come up heads.", "Sam thinks that the coin came up heads."],
        T3_C11_A: ["T3_C11_A", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill will arrive late.", "Sam thinks that the bill might arrive late."],
        T3_C11_S: ["T3_C11_S", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill might arrive late.", "Sam thinks that the bill will arrive late."],
        T3_C12_A: ["T3_C12_A", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima is pregnant.", "Sam thinks that Fatima might be pregnant."],
        T3_C12_S: ["T3_C12_S", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima might be pregnant.", "Sam thinks that Fatima is pregnant."],
        T3_C13_A: ["T3_C13_A", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene passed the class.", "Sam thinks that Rene might have passed the class."],
        T3_C13_S: ["T3_C13_S", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene might have passed the class.", "Sam thinks that Rene passed the class."],
        T3_C14_A: ["T3_C14_A", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast is done.", "Sam thinks that the roast might be done."],
        T3_C14_S: ["T3_C14_S", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast might be done.", "Sam thinks that the roast is done."],
        T3_C15_A: ["T3_C15_A", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner is ready.", "Sam thinks that dinner might be ready."],
        T3_C15_S: ["T3_C15_S", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner might be ready.", "Sam thinks that dinner is ready."],
        T3_C16_A: ["T3_C16_A", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting is at noon.", "Sam thinks that the meeting might be at noon."],
        T3_C16_S: ["T3_C16_S", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting might be at noon.", "Sam thinks that the meeting is at noon."],
        T3_C17_A: ["T3_C17_A", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it is sunny in Sacramento.", "Sam thinks that it might be sunny in Sacramento."],
        T3_C17_S: ["T3_C17_S", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it might be sunny in Sacramento.", "Sam thinks that it is sunny in Sacramento."],
        T3_C18_A: ["T3_C18_A", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander has an ace in his hand.", "Sam thinks that Xander might have an ace in his hand."],
        T3_C18_S: ["T3_C18_S", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander might have an ace in his hand.", "Sam thinks that Xander has an ace in his hand."],
        T3_C19_A: ["T3_C19_A", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food is pizza.", "Sam thinks that Starr's favorite food might be pizza."],
        T3_C19_S: ["T3_C19_S", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food might be pizza.", "Sam thinks that Starr's favorite food is pizza."],
        T3_C20_A: ["T3_C20_A", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story is true.", "Sam thinks that Chen's story might be true."],
        T3_C20_S: ["T3_C20_S", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story might be true.", "Sam thinks that Chen's story is true."],},

    T4: {T4_C1_A: ["T4_C1_A", "Sam and Alex are searching for the keys.",
                    "Alex thinks that the keys might be in the drawer.", "Sam thinks that the keys aren't in the drawer."],
        T4_C1_S: ["T4_C1_S", "Sam and Alex are searching for the keys.",
                        "Alex thinks that the keys aren't in the drawer.", "Sam thinks that the keys might be in the drawer."],
        T4_C2_A: ["T4_C2_A", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam might be in Barcelona.", "Sam thinks that Adam isn't in Barcelona."],
        T4_C2_S: ["T4_C2_S", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam isn't in Barcelona.", "Sam thinks that Adam might be in Barcelona."],
        T4_C3_A: ["T4_C3_A", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones might be a spy.", "Sam thinks that Jones is not a spy."],
        T4_C3_S: ["T4_C3_S", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones is not a spy.", "Sam thinks that Jones might be a spy."],
        T4_C4_A: ["T4_C4_A", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it might be raining in Shanghai", "Sam thinks that it isn't raining in Shanghai."],
        T4_C4_S: ["T4_C4_S", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it isn't raining in Shanghai", "Sam thinks that it might be raining in Shanghai."],
        T4_C5_A: ["T4_C5_A", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose might have eaten the cookies", "Sam thinks that Jose didn't eat the cookies."],
        T4_C5_S: ["T4_C5_S", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose didn't eat the cookies", "Sam thinks that Jose might have eaten the cookies."],
        T4_C6_A: ["T4_C6_A", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria might know how to ride a horse.", "Sam thinks that Maria doesn't know how to ride a horse."],
        T4_C6_S: ["T4_C6_S", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria doesn't know how to ride a horse.", "Sam thinks that Maria might know how to ride a horse."],
        T4_C7_A: ["T4_C7_A", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith might be dead.", "Sam thinks that Smith isn't dead."],
        T4_C7_S: ["T4_C7_S", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith isn't dead.", "Sam thinks that Smith might be dead."],
        T4_C8_A: ["T4_C8_A", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there might be beer in the fridge.", "Sam thinks that there isn't any beer in the fridge."],
        T4_C8_S: ["T4_C8_S", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there isn't any beer in the fridge.", "Sam thinks that there might be beer in the fridge."],
        T4_C9_A: ["T4_C9_A", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus might snowboard.", "Sam thinks that Tyrus doesn't snowboard."],
        T4_C9_S: ["T4_C9_S", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus doesn't snowboard.", "Sam thinks that Tyrus might be snowboard."],
        T4_C10_A: ["T4_C10_A", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin might have come up heads.", "Sam thinks that the coin didn't come up heads."],
        T4_C10_S: ["T4_C10_S", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin didn't come up heads.", "Sam thinks that the coin might have come up heads."],
        T4_C11_A: ["T4_C11_A", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill might arrive late.", "Sam thinks that the bill won't arrive late."],
        T4_C11_S: ["T4_C11_S", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill won't arrive late.", "Sam thinks that the bill might arrive late."],
        T4_C12_A: ["T4_C12_A", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima might be pregnant.", "Sam thinks that Fatima isn't pregnant."],
        T4_C12_S: ["T4_C12_S", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima isn't pregnant.", "Sam thinks that Fatima might be pregnant."],
        T4_C13_A: ["T4_C13_A", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene might have passed the class.", "Sam thinks that Rene didn't pass the class."],
        T4_C13_S: ["T4_C13_S", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene didn't pass the class.", "Sam thinks that Rene might have passed the class."],
        T4_C14_A: ["T4_C14_A", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast might be done.", "Sam thinks that the roast isn't done."],
        T4_C14_S: ["T4_C14_S", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast isn't done.", "Sam thinks that the roast might be done."],
        T4_C15_A: ["T4_C15_A", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner might be ready.", "Sam thinks that dinner isn't ready."],
        T4_C15_S: ["T4_C15_S", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner isn't ready.", "Sam thinks that dinner might be ready."],
        T4_C16_A: ["T4_C16_A", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting might be at noon.", "Sam thinks that the meeting isn't at noon."],
        T4_C16_S: ["T4_C16_S", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting isn't at noon.", "Sam thinks that the meeting might be at noon."],
        T4_C17_A: ["T4_C17_A", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it might be sunny in Sacramento.", "Sam thinks that it's not sunny in Sacramento."],
        T4_C17_S: ["T4_C17_S", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it's not sunny in Sacramento.", "Sam thinks that it might be sunny in Sacramento."],
        T4_C18_A: ["T4_C18_A", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander might have an ace in his hand.", "Sam thinks that Xander doesn't have an ace in his hand."],
        T4_C18_S: ["T4_C18_S", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander doesn't have an ace in his hand.", "Sam thinks that Xander might have an ace in his hand."],
        T4_C19_A: ["T4_C19_A", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food might be pizza.", "Sam thinks that Starr's favorite food isn't pizza."],
        T4_C19_S: ["T4_C19_S", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food isn't pizza.", "Sam thinks that Starr's favorite food might be pizza."],
        T4_C20_A: ["T4_C20_A", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story might be true.", "Sam thinks that Chen's story isn't true."],
        T4_C20_S: ["T4_C20_S", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story isn't true.", "Sam thinks that Chen's story might be true."],},

    T5: {T5_C1_A: ["T5_C1_A", "Sam and Alex are searching for the keys.",
                    "Alex thinks that the keys are in the drawer.", "Sam thinks that the keys might not be in the drawer."],
        T5_C1_S: ["T5_C1_S", "Sam and Alex are searching for the keys.",
                        "Alex thinks that the keys might not be in the drawer.", "Sam thinks that the keys are in the drawer."],
        T5_C2_A: ["T5_C2_A", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam might not be in Barcelona."],
        T5_C2_S: ["T5_C2_S", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam might not be in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T5_C3_A: ["T5_C3_A", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones is a spy.", "Sam thinks that Jones might not be a spy."],
        T5_C3_S: ["T5_C3_S", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones might not be a spy.", "Sam thinks that Jones is a spy."],
        T5_C4_A: ["T5_C4_A", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it is raining in Shanghai", "Sam thinks that it might not be raining in Shanghai."],
        T5_C4_S: ["T5_C4_S", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it might not be raining in Shanghai", "Sam thinks that it is raining in Shanghai."],
        T5_C5_A: ["T5_C5_A", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose ate the cookies", "Sam thinks that Jose might not have eaten the cookies."],
        T5_C5_S: ["T5_C5_S", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose might not have eaten the cookies", "Sam thinks that Jose ate the cookies."],
        T5_C6_A: ["T5_C6_A", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria knows how to ride a horse.", "Sam thinks that Maria might not know how to ride a horse."],
        T5_C6_S: ["T5_C6_S", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria might not know how to ride a horse.", "Sam thinks that Maria knows how to ride a horse."],
        T5_C7_A: ["T5_C7_A", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith is dead.", "Sam thinks that Smith might not be dead."],
        T5_C7_S: ["T5_C7_S", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith might not be dead.", "Sam thinks that Smith is dead."],
        T5_C8_A: ["T5_C8_A", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there is beer in the fridge.", "Sam thinks that there might not be any beer in the fridge."],
        T5_C8_S: ["T5_C8_S", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there might not be any beer in the fridge.", "Sam thinks that there is beer in the fridge."],
        T5_C9_A: ["T5_C9_A", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus snowboards.", "Sam thinks that Tyrus might not snowboard."],
        T5_C9_S: ["T5_C9_S", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus might not snowboard.", "Sam thinks that Tyrus snowboards."],
        T5_C10_A: ["T5_C10_A", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin came up heads.", "Sam thinks that the coin might not have come up heads."],
        T5_C10_S: ["T5_C10_S", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin might not have come up heads.", "Sam thinks that the coin came up heads."],
        T5_C11_A: ["T5_C11_A", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill will arrive late.", "Sam thinks that the bill might not arrive late."],
        T5_C11_S: ["T5_C11_S", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill might not arrive late.", "Sam thinks that the bill will arrive late."],
        T5_C12_A: ["T5_C12_A", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima is pregnant.", "Sam thinks that Fatima might not be pregnant."],
        T5_C12_S: ["T5_C12_S", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima might not be pregnant.", "Sam thinks that Fatima is pregnant."],
        T5_C13_A: ["T5_C13_A", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene passed the class.", "Sam thinks that Rene might not have passed the class."],
        T5_C13_S: ["T5_C13_S", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene might not have passed the class.", "Sam thinks that Rene passed the class."],
        T5_C14_A: ["T5_C14_A", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast is done.", "Sam thinks that the roast might not be done."],
        T5_C14_S: ["T5_C14_S", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast might not be done.", "Sam thinks that the roast is done."],
        T5_C15_A: ["T5_C15_A", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner is ready.", "Sam thinks that dinner might not be ready."],
        T5_C15_S: ["T5_C15_S", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner might not be ready.", "Sam thinks that dinner is ready."],
        T5_C16_A: ["T5_C16_A", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting is at noon.", "Sam thinks that the meeting might not be at noon."],
        T5_C16_S: ["T5_C16_S", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting might not be at noon.", "Sam thinks that the meeting is at noon."],
        T5_C17_A: ["T5_C17_A", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it is sunny in Sacramento.", "Sam thinks that it might not be sunny in Sacramento."],
        T5_C17_S: ["T5_C17_S", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it might not be sunny in Sacramento.", "Sam thinks that it is sunny in Sacramento."],
        T5_C18_A: ["T5_C18_A", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander has an ace in his hand.", "Sam thinks that Xander might not have an ace in his hand."],
        T5_C18_S: ["T5_C18_S", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander might not have an ace in his hand.", "Sam thinks that Xander has an ace in his hand."],
        T5_C19_A: ["T5_C19_A", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food is pizza.", "Sam thinks that Starr's favorite food might not be pizza."],
        T5_C19_S: ["T5_C19_S", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food might not be pizza.", "Sam thinks that Starr's favorite food is pizza."],
        T5_C20_A: ["T5_C20_A", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story is true.", "Sam thinks that Chen's story might not be true."],
        T5_C20_S: ["T5_C20_S", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story might not be true.", "Sam thinks that Chen's story is true."],},

    T6: {T6_C1_A: ["T6_C1_A", "Sam and Alex are searching for the keys.",
                    "Alex thinks that the keys might be in the drawer.", "Sam thinks that the keys might not be in the drawer."],
        T6_C1_S: ["T6_C1_S", "Sam and Alex are searching for the keys.",
                        "Alex thinks that the keys might not be in the drawer.", "Sam thinks that the keys might be in the drawer."],
        T6_C2_A: ["T6_C2_A", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam might be in Barcelona.", "Sam thinks that Adam might not be in Barcelona."],
        T6_C2_S: ["T6_C2_S", "Sam and Alex are curious about the location of their friend Adam.",
                    "Alex thinks that Adam might not be in Barcelona.", "Sam thinks that Adam might be in Barcelona."],
        T6_C3_A: ["T6_C3_A", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones might be a spy.", "Sam thinks that Jones might not be a spy."],
        T6_C3_S: ["T6_C3_S", "Sam and Alex are watching a spy show on television. One of the characters on the show is named Jones.",
                    "Alex thinks that Jones might not be a spy.", "Sam thinks that Jones might be a spy."],
        T6_C4_A: ["T6_C4_A", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it might be raining in Shanghai", "Sam thinks that it might not be raining in Shanghai."],
        T6_C4_S: ["T6_C4_S", "Sam and Alex are curious about the weather in Shanghai.",
                    "Alex thinks that it might not be raining in Shanghai", "Sam thinks that it might be raining in Shanghai."],
        T6_C5_A: ["T6_C5_A", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose might have eaten the cookies", "Sam thinks that Jose might not have eaten the cookies."],
        T6_C5_S: ["T6_C5_S", "Sam and Alex return home to discover that all the cookies have been eaten.",
                    "Alex thinks that Jose might not have eaten the cookies", "Sam thinks that Jose might have eaten the cookies."],
        T6_C6_A: ["T6_C6_A", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria might know how to ride a horse.", "Sam thinks that Maria might not know how to ride a horse."],
        T6_C6_S: ["T6_C6_S", "Sam and Alex are wondering whether their friend, Maria, knows how to ride a horse.",
                    "Alex thinks that Maria might not know how to ride a horse.", "Sam thinks that Maria might know how to ride a horse."],
        T6_C7_A: ["T6_C7_A", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith might be dead.", "Sam thinks that Smith might not be dead."],
        T6_C7_S: ["T6_C7_S", "Sam and Alex are watching their favorite TV drama.  One of the characters on the show is named Smith.",
                    "Alex thinks that Smith might not be dead.", "Sam thinks that Smith might be dead."],
        T6_C8_A: ["T6_C8_A", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there might be beer in the fridge.", "Sam thinks that there might not be any beer in the fridge."],
        T6_C8_S: ["T6_C8_S", "Sam and Alex are at a party and want to find beer.",
                    "Alex thinks that there might not be any beer in the fridge.", "Sam thinks that there might be beer in the fridge."],
        T6_C9_A: ["T6_C9_A", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus might snowboard.", "Sam thinks that Tyrus might not snowboard."],
        T6_C9_S: ["T6_C9_S", "Sam and Alex are wondering whether their professor, Tyrus, also snowboards.",
                    "Alex thinks that Tyrus might not snowboard.", "Sam thinks that Tyrus might be snowboard."],
        T6_C10_A: ["T6_C10_A", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin might have come up heads.", "Sam thinks that the coin might not have come up heads."],
        T6_C10_S: ["T6_C10_S", "Sam has flipped a coin and covered the result so neither of them can see.",
                    "Alex thinks that the coin might not have come up heads.", "Sam thinks that the coin might have come up heads."],
        T6_C11_A: ["T6_C11_A", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill might arrive late.", "Sam thinks that the bill might not arrive late."],
        T6_C11_S: ["T6_C11_S", "Sam and Alex are expecting their utility bill in the mail, but it hasn't arrived yet.",
                    "Alex thinks that the bill might not arrive late.", "Sam thinks that the bill might arrive late."],
        T6_C12_A: ["T6_C12_A", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima might be pregnant.", "Sam thinks that Fatima might not be pregnant."],
        T6_C12_S: ["T6_C12_S", "Sam and Alex have a close mutual friend, Fatima.  They wonder whether she might be expecting a child.",
                    "Alex thinks that Fatima might not be pregnant.", "Sam thinks that Fatima might be pregnant."],
        T6_C13_A: ["T6_C13_A", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene might have passed the class.", "Sam thinks that Rene might not have passed the class."],
        T6_C13_S: ["T6_C13_S", "Rene is struggling in her semantics class.  After finals, Sam and Alex wonder how she did.",
                    "Alex thinks that Rene might not have passed the class.", "Sam thinks that Rene might have passed the class."],
        T6_C14_A: ["T6_C14_A", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast might be done.", "Sam thinks that the roast might not be done."],
        T6_C14_S: ["T6_C14_S", "Sam and Alex are cooking a roast in the oven.",
                    "Alex thinks that the roast might not be done.", "Sam thinks that the roast might be done."],
        T6_C15_A: ["T6_C15_A", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner might be ready.", "Sam thinks that dinner might not be ready."],
        T6_C15_S: ["T6_C15_S", "Sam and Alex are visiting family for the holidays.  Dinner is taking quite a long time to prepare.",
                    "Alex thinks that dinner might not be ready.", "Sam thinks that dinner might be ready."],
        T6_C16_A: ["T6_C16_A", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting might be at noon.", "Sam thinks that the meeting might not be at noon."],
        T6_C16_S: ["T6_C16_S", "Sam and Alex have a meeting with Yolanda scheduled for today.",
                    "Alex thinks that the meeting might not be at noon.", "Sam thinks that the meeting might be at noon."],
        T6_C17_A: ["T6_C17_A", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it might be sunny in Sacramento.", "Sam thinks that it might not be sunny in Sacramento."],
        T6_C17_S: ["T6_C17_S", "Sam and Alex are wondering about the weather in Sacramento.",
                    "Alex thinks that it might not be sunny in Sacramento.", "Sam thinks that it might be sunny in Sacramento."],
        T6_C18_A: ["T6_C18_A", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander might have an ace in his hand.", "Sam thinks that Xander might not have an ace in his hand."],
        T6_C18_S: ["T6_C18_S", "Sam and Alex are playing poker with Xander.",
                    "Alex thinks that Xander might not have an ace in his hand.", "Sam thinks that Xander might have an ace in his hand."],
        T6_C19_A: ["T6_C19_A", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food might be pizza.", "Sam thinks that Starr's favorite food might not be pizza."],
        T6_C19_S: ["T6_C19_S", "Sam and Alex want to take their friend Starr out for a nice meal.",
                    "Alex thinks that Starr's favorite food might not be pizza.", "Sam thinks that Starr's favorite food might be pizza."],
        T6_C20_A: ["T6_C20_A", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story might be true.", "Sam thinks that Chen's story might not be true."],
        T6_C20_S: ["T6_C20_S", "Sam and Alex are wondering whether their mutual friend, Chen, is telling the truth.",
                    "Alex thinks that Chen's story might not be true.", "Sam thinks that Chen's story might be true."],},
}

// var sample = [trials.X_X.X_X_cat, trials.X_X.X_X_dog, trials.X_X.X_X_ele]


// ############################## The Experiment Code and Functions ##############################

// Show the first slide
showSlide("instructions");

var rsample = randomTrials(trials);
var totalTrials = rsample.length;

var measTypes = ["Asym_A", "Asym_S", "Sym"];
var m = measTypes[random(3)];

if (m == "Asym_A") {
  var measurementString = "Does Alex disagree with Sam?";
} else if (m == "Asym_S") {
  var measurementString = "Does Sam disagree with Alex?";
} else if (m == "Sym") {
  var measurementString = "Do Alex and Sam disagree?";
} else {
  var measurementString = "?";
}

var experiment = {

// DATA: The data structure that records the responses to be sent to mTurk
    data: {
        // Participant Worker ID
        gender: [],           // gender of participant
        age: [],              // age
        language: [],         // what is the native language of the participant
        logical_training: [], // what is the participant's experience with formal logic
        trials: [],           // array to store trial responses
        aim: [],              // participant's comments on the aim of the study
        comments: [],          // participant's general comments


        user_agent: [],
        window_width: [],
        window_height: [],
    },

    start_ms: 0,  // time current trial started ms


// END FUNCTION: The function to call when the experiment has ended
    end: function() {
      showSlide("thanks");
      proliferate.submit(experiment.data);
    },

// LOG YES FUNCTION: the function that records the yes responses
    log_yes_response: function() {
      var elapsed = Date.now() - experiment.start_ms;

      this.trial_data.elapsed_ms = elapsed;
      this.trial_data.response = 1;
      experiment.data.trials.push(this.trial_data);

      $('#stage-content').hide();
      experiment.next();
    },

// LOG NO FUNCTION: the function that records the no responses
    log_no_response: function() {
      var elapsed = Date.now() - experiment.start_ms;

      this.trial_data.elapsed_ms = elapsed;
      this.trial_data.response = 0;
      experiment.data.trials.push(this.trial_data);

      $('#stage-content').hide();
      experiment.next();
    },

// NEXT FUNCTION: The work horse of the sequence - what to do on every trial.
    next: function() {
      // Allow experiment to start if it's a turk worker OR if it's a test run
      if (window.self == window.top | turk.workerId.length > 0) {
          $("#testMessage").html('');   // clear the test message
          $("#prog").attr("style","width:" +
              String(100 * (1 - rsample.length/totalTrials)) + "%")
          // style="width:progressTotal%"
          window.setTimeout(function() {
            $('#stage-content').show();
            experiment.start_ms = Date.now();
            experiment.num_errors = 0;
          }, 150);

          // Get the current trial - <code>shift()</code> removes the first element
          // select from our scales array and stop exp after we've exhausted all the domains
          var current_trial = rsample.shift();

          //If the current trial is undefined, call the end function.
          if (typeof current_trial == "undefined") {
            return experiment.debriefing();
          }

          // Display the sentence stimuli
          // var face_filename = getFaceFile(face_dft);

          $("#context").text(current_trial[1]);
          $("#alex").text(current_trial[2]);
          $("#sam").text(current_trial[3]);
          $("#measurement").text(measurementString);

          // push all relevant variables into data object
          types = current_trial[0].split('_');
          this.trial_data = {
            "trial_type": types[0],
            "context_type": types[1],
            "alternation": types[2],
            "measurement_type": m,
            "window_height": $(window).height()
          }

          showSlide("stage");
      }
    },

    //  go to debriefing slide
    debriefing: function() {
      showSlide("debriefing");
    },

    // submitcomments function
    submit_comments: function(f, event) {
        event.preventDefault();
            experiment.data.age.push(document.getElementById("age").value);
        experiment.data.gender.push(document.getElementById("gender").value);
        experiment.data.logical_training.push(document.getElementById("education").value);
        experiment.data.aim.push(document.getElementById("expthoughts").value);
        experiment.data.comments.push(document.getElementById("expcomments").value);
        experiment.data.language.push(document.getElementById("explanguage").value);
        experiment.data.user_agent.push(window.navigator.userAgent);
        experiment.end();
    }
}

$(function() {
  $('form#demographics').validate({
    rules: {
      "age": "required",
      "gender": "required",
      "education": "required",
//      "race[]": "required",
    },
    messages: {
      "age": "Please choose an option",
      "gender": "Please choose an option",
      "education": "Please choose an option",
    },
    submitHandler: experiment.submit_comments
  });
});
