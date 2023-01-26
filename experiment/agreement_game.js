// ############################## Helper functions ##############################
// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
  $(".slide").hide();
  // Show just the slide we want to show
  $("#"+id).show();
}

// Get random integers.
// When called with no arguments, it returns either 0 or 1. When called with one argument, *a*, it returns a number in {*0, 1, ., a-1*}. When called with two arguments, *a* and *b*, returns a random value in {*a*, *a + 1*, . , *b*}.
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

  // While there remain elements to shuffle.
  while (0 !== currentIndex) {

    // Pick a remaining element.
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
    T1: {T1_C1_A: ["T1_C1_A", "Sam and Alex are taking the final exam for a course.",
                    "Alex thinks that the answer to Question 4 is B.", "Sam thinks that the answer to Question 4 is B."],
        T1_C1_S: ["T1_C1_S", "Sam and Alex are taking the final exam for a course.",
                    "Alex thinks that the answer to Question 4 is B.", "Sam thinks that the answer to Question 4 is B."],
        T1_C2_A: ["T1_C2_A", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T1_C2_S: ["T1_C2_S", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T1_C3_A: ["T1_C3_A", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world is round.", "Sam thinks that the world is round."],
        T1_C3_S: ["T1_C3_S", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world is round.", "Sam thinks that the world is round."],
        T1_C4_A: ["T1_C4_A", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris will win the election.", "Sam thinks that Harris will win the election."],
        T1_C4_S: ["T1_C4_S", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris will win the election.", "Sam thinks that Harris will win the election."],
        T1_C5_A: ["T1_C5_A", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac is alive.", "Sam thinks that Tupac is alive."],
        T1_C5_S: ["T1_C5_S", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac is alive.", "Sam thinks that Tupac is alive."],
        T1_C6_A: ["T1_C6_A", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth is more than 6000 years old.", "Sam thinks that the Earth is more than 6000 years old."],
        T1_C6_S: ["T1_C6_S", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth is more than 6000 years old.", "Sam thinks that the Earth is more than 6000 years old."],
        T1_C7_A: ["T1_C7_A", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback will throw an interception.", "Sam thinks that the quarterback will throw an interception."],
        T1_C7_S: ["T1_C7_S", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback will throw an interception.", "Sam thinks that the quarterback will throw an interception."],
        T1_C8_A: ["T1_C8_A", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates will continue to rise.", "Sam thinks that interest rates will continue to rise."],
        T1_C8_S: ["T1_C8_S", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates will continue to rise.", "Sam thinks that interest rates will continue to rise."],
        T1_C9_A: ["T1_C9_A", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu is bluffing.", "Sam thinks that Negreanu is bluffing."],
        T1_C9_S: ["T1_C9_S", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu is bluffing.", "Sam thinks that Negreanu is bluffing."],
        T1_C10_A: ["T1_C10_A", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse will talk.", "Sam thinks that Jesse will talk."],
        T1_C10_S: ["T1_C10_S", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse will talk.", "Sam thinks that Jesse will talk."],
        T1_C11_A: ["T1_C11_A", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose will be downward dog.", "Sam thinks that the next pose will be downward dog."],
        T1_C11_S: ["T1_C11_S", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose will be downward dog.", "Sam thinks that the next pose will be downward dog."],
        T1_C12_A: ["T1_C12_A", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework is due tomorrow.", "Sam thinks that the homework is due tomorrow."],
        T1_C12_S: ["T1_C12_S", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework is due tomorrow.", "Sam thinks that the homework is due tomorrow."],
        T1_C13_A: ["T1_C13_A", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace will win the race.", "Sam thinks that Ace will win the race."],
        T1_C13_S: ["T1_C13_S", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace will win the race.", "Sam thinks that Ace will win the race."],
        T1_C14_A: ["T1_C14_A", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party will be sent for the survivors.", "Sam thinks that a search party will be sent for the survivors."],
        T1_C14_S: ["T1_C14_S", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party will be sent for the survivors.", "Sam thinks that a search party will be sent for the survivors."],
        T1_C15_A: ["T1_C15_A", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it will rain before the day is over.", "Sam thinks that it will rain before the day is over."],
        T1_C15_S: ["T1_C15_S", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it will rain before the day is over.", "Sam thinks that it will rain before the day is over."],
        T1_C16_A: ["T1_C16_A", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there are bears in the area.", "Sam thinks that there are bears in the area."],
        T1_C16_S: ["T1_C16_S", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there are bears in the area.", "Sam thinks that there are bears in the area."],
        T1_C17_A: ["T1_C17_A", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby is at the service.", "Sam thinks that Bobby is at the service."],
        T1_C17_S: ["T1_C17_S", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby is at the service.", "Sam thinks that Bobby is at the service."],
        T1_C18_A: ["T1_C18_A", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie will be over two hours long.", "Sam thinks that that the movie will be over two hours long."],
        T1_C18_S: ["T1_C18_S", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie will be over two hours long.", "Sam thinks that that the movie will be over two hours long."],
        T1_C19_A: ["T1_C19_A", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry will appear in the second act.", "Sam thinks that Gerry will appear in the second act."],
        T1_C19_S: ["T1_C19_S", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry will appear in the second act.", "Sam thinks that Gerry will appear in the second act."],
        T1_C20_A: ["T1_C20_A", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt has children.", "Sam thinks that Matt has children."],
        T1_C20_S: ["T1_C20_S", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt has children.", "Sam thinks that Matt has children."],},

    T2: {T2_C1_A: ["T2_C1_A", "Sam and Alex are taking the final exam for a course.",
                    "Alex thinks that the answer to Question 4 is B.", "Sam thinks that the answer to Question 4 is not B."],
        T2_C1_S: ["T2_C1_S", "Sam and Alex are taking the final exam for a course.",
                        "Alex thinks that the answer to Question 4 is not B.", "Sam thinks that the answer to Question 4 is B."],
        T2_C2_A: ["T2_C2_A", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam isn't in Barcelona."],
        T2_C2_S: ["T2_C2_S", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam isn't in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T2_C3_A: ["T2_C3_A", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world is round.", "Sam thinks that the world is not round."],
        T2_C3_S: ["T2_C3_S", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world is not round.", "Sam thinks that the world is round."],
        T2_C4_A: ["T2_C4_A", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris will win the election.", "Sam thinks that Harris will not win the election."],
        T2_C4_S: ["T2_C4_S", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris will not win the election.", "Sam thinks that Harris will win the election."],
        T2_C5_A: ["T2_C5_A", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac is alive.", "Sam thinks that Tupac is not alive."],
        T2_C5_S: ["T2_C5_S", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac is not alive.", "Sam thinks that Tupac is alive."],
        T2_C6_A: ["T2_C6_A", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth is more than 6000 years old.", "Sam thinks that the Earth isn't more than 6000 years old."],
        T2_C6_S: ["T2_C6_S", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth isn't more than 6000 years old.", "Sam thinks that the Earth is more than 6000 years old."],
        T2_C7_A: ["T2_C7_A", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback will throw an interception.", "Sam thinks that the quarterback will not throw an interception."],
        T2_C7_S: ["T2_C7_S", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback will not throw an interception.", "Sam thinks that the quarterback will throw an interception."],
        T2_C8_A: ["T2_C8_A", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates will continue to rise.", "Sam thinks that interest rates will not continue to rise."],
        T2_C8_S: ["T2_C8_S", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates will not continue to rise.", "Sam thinks that interest rates will continue to rise."],
        T2_C9_A: ["T2_C9_A", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu is bluffing.", "Sam thinks that Negreanu isn't bluffing."],
        T2_C9_S: ["T2_C9_S", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu isn't bluffing.", "Sam thinks that Negreanu is bluffing."],
        T2_C10_A: ["T2_C10_A", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse will talk.", "Sam thinks that Jesse will not talk."],
        T2_C10_S: ["T2_C10_S", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse will not talk.", "Sam thinks that Jesse will talk."],
        T2_C11_A: ["T2_C11_A", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose will be downward dog.", "Sam thinks that the next pose will not be downward dog."],
        T2_C11_S: ["T2_C11_S", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose will not be downward dog.", "Sam thinks that the next pose will be downward dog."],
        T2_C12_A: ["T2_C12_A", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework is due tomorrow.", "Sam thinks that the homework isn't due tomorrow."],
        T2_C12_S: ["T2_C12_S", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework isn't due tomorrow.", "Sam thinks that the homework is due tomorrow."],
        T2_C13_A: ["T2_C13_A", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace will win the race.", "Sam thinks that Ace won't win the race."],
        T2_C13_S: ["T2_C13_S", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace won't win the race.", "Sam thinks that Ace will win the race."],
        T2_C14_A: ["T2_C14_A", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party will be sent for the survivors.", "Sam thinks that a search party won't be sent for the survivors."],
        T2_C14_S: ["T2_C14_S", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party won't be sent for the survivors.", "Sam thinks that a search party will be sent for the survivors."],
        T2_C15_A: ["T2_C15_A", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it will rain before the day is over.", "Sam thinks that it will not rain before the day is over."],
        T2_C15_S: ["T2_C15_S", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it will not rain before the day is over.", "Sam thinks that it will rain before the day is over."],
        T2_C16_A: ["T2_C16_A", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there are bears in the area.", "Sam thinks that there are no bears in the area."],
        T2_C16_S: ["T2_C16_S", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there are no bears in the area.", "Sam thinks that there are bears in the area."],
        T2_C17_A: ["T2_C17_A", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby is at the service.", "Sam thinks that Bobby isn't at the service."],
        T2_C17_S: ["T2_C17_S", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby isn't at the service.", "Sam thinks that Bobby is at the service."],
        T2_C18_A: ["T2_C18_A", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie will be over two hours long.", "Sam thinks that that the movie won't be over two hours long."],
        T2_C18_S: ["T2_C18_S", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie won't be over two hours long.", "Sam thinks that that the movie will be over two hours long."],
        T2_C19_A: ["T2_C19_A", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry will appear in the second act.", "Sam thinks that Gerry won't appear in the second act."],
        T2_C19_S: ["T2_C19_S", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry won't appear in the second act.", "Sam thinks that Gerry will appear in the second act."],
        T2_C20_A: ["T2_C20_A", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt has children.", "Sam thinks that Matt doesn't have any children."],
        T2_C20_S: ["T2_C20_S", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt doesn't have any children.", "Sam thinks that Matt has children."],},

    T3: {T3_C1_A: ["T3_C1_A", "Sam and Alex are taking the final exam for a course.",
                    "Alex thinks that the answer to Question 4 is B.", "Sam thinks that the answer to Question 4 might be B."],
        T3_C1_S: ["T3_C1_S", "Sam and Alex are taking the final exam for a course.",
                        "Alex thinks that the answer to Question 4 might be B.", "Sam thinks that the answer to Question 4 is B."],
        T3_C2_A: ["T3_C2_A", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam might be in Barcelona."],
        T3_C2_S: ["T3_C2_S", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam might be in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T3_C3_A: ["T3_C3_A", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world is round.", "Sam thinks that the world might be round."],
        T3_C3_S: ["T3_C3_S", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world might be round.", "Sam thinks that the world is round."],
        T3_C4_A: ["T3_C4_A", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris will win the election.", "Sam thinks that Harris might win the election."],
        T3_C4_S: ["T3_C4_S", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris might win the election.", "Sam thinks that Harris will win the election."],
        T3_C5_A: ["T3_C5_A", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac is alive.", "Sam thinks that Tupac might be alive."],
        T3_C5_S: ["T3_C5_S", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac might be alive.", "Sam thinks that Tupac is alive."],
        T3_C6_A: ["T3_C6_A", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth is more than 6000 years old.", "Sam thinks that the Earth might be more than 6000 years old."],
        T3_C6_S: ["T3_C6_S", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth might be more than 6000 years old.", "Sam thinks that the Earth is more than 6000 years old."],
        T3_C7_A: ["T3_C7_A", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback will throw an interception.", "Sam thinks that the quarterback might throw an interception."],
        T3_C7_S: ["T3_C7_S", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback might throw an interception.", "Sam thinks that the quarterback will throw an interception."],
        T3_C8_A: ["T3_C8_A", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates will continue to rise.", "Sam thinks that interest rates might continue to rise."],
        T3_C8_S: ["T3_C8_S", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates might continue to rise.", "Sam thinks that interest rates will continue to rise."],
        T3_C9_A: ["T3_C9_A", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu is bluffing.", "Sam thinks that Negreanu might be bluffing."],
        T3_C9_S: ["T3_C9_S", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu might be bluffing.", "Sam thinks that Negreanu is bluffing."],
        T3_C10_A: ["T3_C10_A", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse will talk.", "Sam thinks that Jesse might talk."],
        T3_C10_S: ["T3_C10_S", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse might talk.", "Sam thinks that Jesse will talk."],
        T3_C11_A: ["T3_C11_A", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose will be downward dog.", "Sam thinks that the next pose might be downward dog."],
        T3_C11_S: ["T3_C11_S", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose might be downward dog.", "Sam thinks that the next pose will be downward dog."],
        T3_C12_A: ["T3_C12_A", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework is due tomorrow.", "Sam thinks that the homework might be due tomorrow."],
        T3_C12_S: ["T3_C12_S", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework might be due tomorrow.", "Sam thinks that the homework is due tomorrow."],
        T3_C13_A: ["T3_C13_A", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace will win the race.", "Sam thinks that Ace might win the race."],
        T3_C13_S: ["T3_C13_S", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace might win the race.", "Sam thinks that Ace will win the race."],
        T3_C14_A: ["T3_C14_A", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party will be sent for the survivors.", "Sam thinks that a search party might be sent for the survivors."],
        T3_C14_S: ["T3_C14_S", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party might be sent for the survivors.", "Sam thinks that a search party will be sent for the survivors."],
        T3_C15_A: ["T3_C15_A", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it will rain before the day is over.", "Sam thinks that it might rain before the day is over."],
        T3_C15_S: ["T3_C15_S", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it might rain before the day is over.", "Sam thinks that it will rain before the day is over."],
        T3_C16_A: ["T3_C16_A", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there are bears in the area.", "Sam thinks that there might be bears in the area."],
        T3_C16_S: ["T3_C16_S", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there might be bears in the area.", "Sam thinks that there are bears in the area."],
        T3_C17_A: ["T3_C17_A", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby is at the service.", "Sam thinks that Bobby might be at the service."],
        T3_C17_S: ["T3_C17_S", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby might be at the service.", "Sam thinks that Bobby is at the service."],
        T3_C18_A: ["T3_C18_A", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie will be over two hours long.", "Sam thinks that that the movie might be over two hours long."],
        T3_C18_S: ["T3_C18_S", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie might be over two hours long.", "Sam thinks that that the movie will be over two hours long."],
        T3_C19_A: ["T3_C19_A", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry will appear in the second act.", "Sam thinks that Gerry might appear in the second act."],
        T3_C19_S: ["T3_C19_S", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry might appear in the second act.", "Sam thinks that Gerry will appear in the second act."],
        T3_C20_A: ["T3_C20_A", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt has children.", "Sam thinks that Matt might have children."],
        T3_C20_S: ["T3_C20_S", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt might have children.", "Sam thinks that Matt has children."],},

    T4: {T4_C1_A: ["T4_C1_A", "Sam and Alex are taking the final exam for a course.",
                    "Alex thinks that the answer to Question 4 might be B.", "Sam thinks that the answer to Question 4 is not B."],
        T4_C1_S: ["T4_C1_S", "Sam and Alex are taking the final exam for a course.",
                        "Alex thinks that the answer to Question 4 is not B.", "Sam thinks that the answer to Question 4 might be B."],
        T4_C2_A: ["T4_C2_A", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam might be in Barcelona.", "Sam thinks that Adam isn't in Barcelona."],
        T4_C2_S: ["T4_C2_S", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam isn't in Barcelona.", "Sam thinks that Adam might be in Barcelona."],
        T4_C3_A: ["T4_C3_A", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world might be round.", "Sam thinks that the world is not round."],
        T4_C3_S: ["T4_C3_S", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world is not round.", "Sam thinks that the world might be round."],
        T4_C4_A: ["T4_C4_A", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris might win the election.", "Sam thinks that Harris will not win the election."],
        T4_C4_S: ["T4_C4_S", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris will not win the election.", "Sam thinks that Harris might win the election."],
        T4_C5_A: ["T4_C5_A", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac might be alive.", "Sam thinks that Tupac is not alive."],
        T4_C5_S: ["T4_C5_S", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac is not alive.", "Sam thinks that Tupac might be alive."],
        T4_C6_A: ["T4_C6_A", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth might be more than 6000 years old.", "Sam thinks that the Earth isn't more than 6000 years old."],
        T4_C6_S: ["T4_C6_S", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth isn't more than 6000 years old.", "Sam thinks that the Earth might be more than 6000 years old."],
        T4_C7_A: ["T4_C7_A", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback might throw an interception.", "Sam thinks that the quarterback will not throw an interception."],
        T4_C7_S: ["T4_C7_S", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback will not throw an interception.", "Sam thinks that the quarterback might throw an interception."],
        T4_C8_A: ["T4_C8_A", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates might continue to rise.", "Sam thinks that interest rates will not continue to rise."],
        T4_C8_S: ["T4_C8_S", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates will not continue to rise.", "Sam thinks that interest rates might continue to rise."],
        T4_C9_A: ["T4_C9_A", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu might be bluffing.", "Sam thinks that Negreanu isn't bluffing."],
        T4_C9_S: ["T4_C9_S", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu isn't bluffing.", "Sam thinks that Tyrus might be snowboard."],
        T4_C10_A: ["T4_C10_A", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse might talk.", "Sam thinks that Jesse will not talk."],
        T4_C10_S: ["T4_C10_S", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse will not talk.", "Sam thinks that Jesse might talk."],
        T4_C11_A: ["T4_C11_A", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose might be downward dog.", "Sam thinks that the next pose will not be downward dog."],
        T4_C11_S: ["T4_C11_S", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose will not be downward dog.", "Sam thinks that the next pose might be downward dog."],
        T4_C12_A: ["T4_C12_A", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework might be due tomorrow.", "Sam thinks that the homework isn't due tomorrow."],
        T4_C12_S: ["T4_C12_S", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework isn't due tomorrow.", "Sam thinks that the homework might be due tomorrow."],
        T4_C13_A: ["T4_C13_A", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace might win the race.", "Sam thinks that Ace won't win the race."],
        T4_C13_S: ["T4_C13_S", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace won't win the race.", "Sam thinks that Ace might win the race."],
        T4_C14_A: ["T4_C14_A", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party might be sent for the survivors.", "Sam thinks that a search party won't be sent for the survivors."],
        T4_C14_S: ["T4_C14_S", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party won't be sent for the survivors.", "Sam thinks that a search party might be sent for the survivors."],
        T4_C15_A: ["T4_C15_A", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it might rain before the day is over.", "Sam thinks that it will not rain before the day is over."],
        T4_C15_S: ["T4_C15_S", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it will not rain before the day is over.", "Sam thinks that it might rain before the day is over."],
        T4_C16_A: ["T4_C16_A", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there might be bears in the area.", "Sam thinks that there are no bears in the area."],
        T4_C16_S: ["T4_C16_S", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there are no bears in the area.", "Sam thinks that there might be bears in the area."],
        T4_C17_A: ["T4_C17_A", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby might be at the service.", "Sam thinks that Bobby isn't at the service."],
        T4_C17_S: ["T4_C17_S", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby isn't at the service.", "Sam thinks that Bobby might be at the service."],
        T4_C18_A: ["T4_C18_A", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie might be over two hours long.", "Sam thinks that that the movie won't be over two hours long."],
        T4_C18_S: ["T4_C18_S", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie won't be over two hours long.", "Sam thinks that that the movie might be over two hours long."],
        T4_C19_A: ["T4_C19_A", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry might appear in the second act.", "Sam thinks that Gerry won't appear in the second act."],
        T4_C19_S: ["T4_C19_S", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry won't appear in the second act.", "Sam thinks that Gerry might appear in the second act."],
        T4_C20_A: ["T4_C20_A", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt might have children.", "Sam thinks that Matt doesn't have any children."],
        T4_C20_S: ["T4_C20_S", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt doesn't have any children.", "Sam thinks that Matt might have children."],},

    T5: {T5_C1_A: ["T5_C1_A", "Sam and Alex are taking the final exam for a course.",
                    "Alex thinks that the answer to Question 4 is B.", "Sam thinks that the answer to Question 4 might not be B."],
        T5_C1_S: ["T5_C1_S", "Sam and Alex are taking the final exam for a course.",
                        "Alex thinks that the answer to Question 4 might not be B.", "Sam thinks that the answer to Question 4 is B."],
        T5_C2_A: ["T5_C2_A", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam is in Barcelona.", "Sam thinks that Adam might not be in Barcelona."],
        T5_C2_S: ["T5_C2_S", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam might not be in Barcelona.", "Sam thinks that Adam is in Barcelona."],
        T5_C3_A: ["T5_C3_A", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world is round.", "Sam thinks that the world might not be round."],
        T5_C3_S: ["T5_C3_S", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world might not be round.", "Sam thinks that the world is round."],
        T5_C4_A: ["T5_C4_A", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris will win the election.", "Sam thinks that Harris might not win the election."],
        T5_C4_S: ["T5_C4_S", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris might not win the election.", "Sam thinks that Harris will win the election."],
        T5_C5_A: ["T5_C5_A", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac is alive.", "Sam thinks that Tupac might not be alive."],
        T5_C5_S: ["T5_C5_S", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac might not be alive.", "Sam thinks that Tupac is alive."],
        T5_C6_A: ["T5_C6_A", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth is more than 6000 years old.", "Sam thinks that the Earth might not be more than 6000 years old."],
        T5_C6_S: ["T5_C6_S", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth might not be more than 6000 years old.", "Sam thinks that the Earth is more than 6000 years old."],
        T5_C7_A: ["T5_C7_A", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback will throw an interception.", "Sam thinks that the quarterback might not throw an interception."],
        T5_C7_S: ["T5_C7_S", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback might not throw an interception.", "Sam thinks that the quarterback will throw an interception."],
        T5_C8_A: ["T5_C8_A", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates will continue to rise.", "Sam thinks that interest rates might not continue to rise."],
        T5_C8_S: ["T5_C8_S", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates might not continue to rise.", "Sam thinks that interest rates will continue to rise."],
        T5_C9_A: ["T5_C9_A", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu is bluffing.", "Sam thinks that Negreanu might not be bluffing."],
        T5_C9_S: ["T5_C9_S", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu might not be bluffing.", "Sam thinks that Negreanu is bluffing."],
        T5_C10_A: ["T5_C10_A", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse will talk.", "Sam thinks that Jesse might not talk."],
        T5_C10_S: ["T5_C10_S", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse might not talk.", "Sam thinks that Jesse will talk."],
        T5_C11_A: ["T5_C11_A", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose will be downward dog.", "Sam thinks that the next pose might not be downward dog."],
        T5_C11_S: ["T5_C11_S", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose might not be downward dog.", "Sam thinks that the next pose will be downward dog."],
        T5_C12_A: ["T5_C12_A", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework is due tomorrow.", "Sam thinks that the homework might not be due tomorrow."],
        T5_C12_S: ["T5_C12_S", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework might not be due tomorrow.", "Sam thinks that the homework is due tomorrow."],
        T5_C13_A: ["T5_C13_A", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace will win the race.", "Sam thinks that Ace might not win the race."],
        T5_C13_S: ["T5_C13_S", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace might not win the race.", "Sam thinks that Ace will win the race."],
        T5_C14_A: ["T5_C14_A", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party will be sent for the survivors.", "Sam thinks that a search party might not be sent for the survivors."],
        T5_C14_S: ["T5_C14_S", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party might not be sent for the survivors.", "Sam thinks that a search party will be sent for the survivors."],
        T5_C15_A: ["T5_C15_A", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it will rain before the day is over.", "Sam thinks that it might not rain before the day is over."],
        T5_C15_S: ["T5_C15_S", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it might not rain before the day is over.", "Sam thinks that it will rain before the day is over."],
        T5_C16_A: ["T5_C16_A", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there are bears in the area.", "Sam thinks that there might not be any bears in the area."],
        T5_C16_S: ["T5_C16_S", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there might not be any bears in the area.", "Sam thinks that there are bears in the area."],
        T5_C17_A: ["T5_C17_A", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby is at the service.", "Sam thinks that Bobby might not be at the service."],
        T5_C17_S: ["T5_C17_S", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby might not be at the service.", "Sam thinks that Bobby is at the service."],
        T5_C18_A: ["T5_C18_A", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie will be over two hours long.", "Sam thinks that that the movie might not be over two hours long."],
        T5_C18_S: ["T5_C18_S", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie might not be over two hours long.", "Sam thinks that that the movie will be over two hours long."],
        T5_C19_A: ["T5_C19_A", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry will appear in the second act.", "Sam thinks that Gerry might not appear in the second act."],
        T5_C19_S: ["T5_C19_S", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry might not appear in the second act.", "Sam thinks that Gerry will appear in the second act."],
        T5_C20_A: ["T5_C20_A", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt has children.", "Sam thinks that Matt might not have any children."],
        T5_C20_S: ["T5_C20_S", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt might not have any children.", "Sam thinks that Matt has children."],},

    T6: {T6_C1_A: ["T6_C1_A", "Sam and Alex are taking the final exam for a course.",
                    "Alex thinks that the answer to Question 4 might be B.", "Sam thinks that the answer to Question 4 might not be B."],
        T6_C1_S: ["T6_C1_S", "Sam and Alex are taking the final exam for a course.",
                        "Alex thinks that the answer to Question 4 might not be B.", "Sam thinks that the answer to Question 4 might be B."],
        T6_C2_A: ["T6_C2_A", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam might be in Barcelona.", "Sam thinks that Adam might not be in Barcelona."],
        T6_C2_S: ["T6_C2_S", "Sam is in San Francisco and Alex is in Boston.",
                    "Alex thinks that Adam might not be in Barcelona.", "Sam thinks that Adam might be in Barcelona."],
        T6_C3_A: ["T6_C3_A", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world might be round.", "Sam thinks that the world might not be round."],
        T6_C3_S: ["T6_C3_S", "Sam and Alex have opinions about the shape of the Earth.",
                    "Alex thinks that the world might not be round.", "Sam thinks that the world might be round."],
        T6_C4_A: ["T6_C4_A", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris might win the election.", "Sam thinks that Harris might not win the election."],
        T6_C4_S: ["T6_C4_S", "There is an upcoming election.  Harris is one of the candidates for governor.",
                    "Alex thinks that Harris might not win the election.", "Sam thinks that Harris might win the election."],
        T6_C5_A: ["T6_C5_A", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac might be alive.", "Sam thinks that Tupac might not be alive."],
        T6_C5_S: ["T6_C5_S", "Sam and Alex both like listening to songs by the rapper Tupac.",
                    "Alex thinks that Tupac might not be alive.", "Sam thinks that Tupac might be alive."],
        T6_C6_A: ["T6_C6_A", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth might be more than 6000 years old.", "Sam thinks that the Earth might not be more than 6000 years old."],
        T6_C6_S: ["T6_C6_S", "Sam and Alex have opinions about the age of the Earth.",
                    "Alex thinks that the Earth might not be more than 6000 years old.", "Sam thinks that the Earth might be more than 6000 years old."],
        T6_C7_A: ["T6_C7_A", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback might throw an interception.", "Sam thinks that the quarterback might not throw an interception."],
        T6_C7_S: ["T6_C7_S", "Sam and Alex are fans of opposing football teams and are sitting on opposite sides of a football stadium.",
                    "Alex thinks that the quarterback might not throw an interception.", "Sam thinks that the quarterback might throw an interception."],
        T6_C8_A: ["T6_C8_A", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates might continue to rise.", "Sam thinks that interest rates might not continue to rise."],
        T6_C8_S: ["T6_C8_S", "Sam and Alex both work in the financial services sector but for different firms.",
                    "Alex thinks that interest rates might not continue to rise.", "Sam thinks that interest rates might continue to rise."],
        T6_C9_A: ["T6_C9_A", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu might be bluffing.", "Sam thinks that Negreanu might not be bluffing."],
        T6_C9_S: ["T6_C9_S", "Sam and Alex are watching a professional poker game in-person. Talking from the audience is strictly prohibited.",
                    "Alex thinks that Negreanu might not be bluffing.", "Sam thinks that Tyrus might be snowboard."],
        T6_C10_A: ["T6_C10_A", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse might talk.", "Sam thinks that Jesse might not talk."],
        T6_C10_S: ["T6_C10_S", "Sam and Alex are both being interrogated in separate rooms. Their mutual friend, Jesse, is being held in a third room.",
                    "Alex thinks that Jesse might not talk.", "Sam thinks that Jesse might talk."],
        T6_C11_A: ["T6_C11_A", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose might be downward dog.", "Sam thinks that the next pose might not be downward dog."],
        T6_C11_S: ["T6_C11_S", "Sam and Alex are in the middle of a yoga class.",
                    "Alex thinks that the next pose might not be downward dog.", "Sam thinks that the next pose might be downward dog."],
        T6_C12_A: ["T6_C12_A", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework might be due tomorrow.", "Sam thinks that the homework might not be due tomorrow."],
        T6_C12_S: ["T6_C12_S", "Sam and Alex are enrolled in the same course.",
                    "Alex thinks that the homework might not be due tomorrow.", "Sam thinks that the homework might be due tomorrow."],
        T6_C13_A: ["T6_C13_A", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace might win the race.", "Sam thinks that Ace might not win the race."],
        T6_C13_S: ["T6_C13_S", "Alex and Sam are in the middle of a race at a swimming meet.",
                    "Alex thinks that Ace might not win the race.", "Sam thinks that Ace might win the race."],
        T6_C14_A: ["T6_C14_A", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party might be sent for the survivors.", "Sam thinks that a search party might not be sent for the survivors."],
        T6_C14_S: ["T6_C14_S", "Sam and Alex survived a plane crash and are trapped on separate deserted islands.",
                    "Alex thinks that a search party might not be sent for the survivors.", "Sam thinks that a search party might be sent for the survivors."],
        T6_C15_A: ["T6_C15_A", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it might rain before the day is over.", "Sam thinks that it might not rain before the day is over."],
        T6_C15_S: ["T6_C15_S", "Sam and Alex are running in the same marathon.  Alex is much further along than Sam.",
                    "Alex thinks that it might not rain before the day is over.", "Sam thinks that it might rain before the day is over."],
        T6_C16_A: ["T6_C16_A", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there might be bears in the area.", "Sam thinks that there might not be any bears in the area."],
        T6_C16_S: ["T6_C16_S", "Sam and Alex are hiking in the same area.",
                    "Alex thinks that there might not be any bears in the area.", "Sam thinks that there might be bears in the area."],
        T6_C17_A: ["T6_C17_A", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby might be at the service.", "Sam thinks that Bobby might not be at the service."],
        T6_C17_S: ["T6_C17_S", "Sam and Alex are attending a service at the same church.  Bobby is their mutual acquaintance.",
                    "Alex thinks that Bobby might not be at the service.", "Sam thinks that Bobby might be at the service."],
        T6_C18_A: ["T6_C18_A", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie might be over two hours long.", "Sam thinks that that the movie might not be over two hours long."],
        T6_C18_S: ["T6_C18_S", "Sam and Alex are watching a movie in the same theater.",
                    "Alex thinks that that the movie might not be over two hours long.", "Sam thinks that that the movie might be over two hours long."],
        T6_C19_A: ["T6_C19_A", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry might appear in the second act.", "Sam thinks that Gerry might not appear in the second act."],
        T6_C19_S: ["T6_C19_S", "Sam and Alex are watching a musical that Gerry is performing in.  Gerry hasn't appeared on stage yet.",
                    "Alex thinks that Gerry might not appear in the second act.", "Sam thinks that Gerry might appear in the second act."],
        T6_C20_A: ["T6_C20_A", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt might have children.", "Sam thinks that Matt might not have any children."],
        T6_C20_S: ["T6_C20_S", "Sam and Alex have the same personal trainer, Matt.",
                    "Alex thinks that Matt might not have any children.", "Sam thinks that Matt might have children."],},
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
        experiment.data.language.push(document.getElementById("debrief1").value);
        experiment.data.language.push(document.getElementById("debrief2").value);
        experiment.data.language.push(document.getElementById("debrief3").value);
        experiment.data.language.push(document.getElementById("debrief4").value);
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
