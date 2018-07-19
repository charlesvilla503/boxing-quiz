document.documentElement.className = 'no-fouc';

const STORE = {
	currentQ: 0,
	currentUserAnswer: null,
	questions: [{
					// INTRO
					q: `LET'S GET READY TO RUMBLE!!`,
					a: ['Welcome to the Boxing History Quiz', 'Tremble at your knowledge, or lack thereof, of a once-popular sport!', 'Important Advice: When all else fails, just keep swinging'],
					u: null,
					c: null,
					r: null
				},{
					// Question 1
					q:'Manny Pacquiao captured a championship belt in how many weight classes?',
					a: ['7', '4', '5', '8'],
					u: null,
					c: 3,
					m: '8',
					r: null
				},{
					// Question 2
					q: 'Where was Muhammad Ali born?',
					a: ['Baltimore, MD', 'Louisville, KY', 'San Fernando Valley, CA', 'Houston, TX'],
					u: null,
					c: 1,
					m: 'Louisville, KY',
					r: null
				},{
					// Question 3
					q: `Which fighter was nicknamed "Manos de Piedra"?`,
					a: ['Roberto Duran', 'Mike Alvarado', 'Tito Trinidad', 'Danny Garcia'],
					u: null,
					c: 0,
					m: 'Roberto Duran',
					r: null
				},{
					// Question 4
					q: 'How many people witnessed Carl Froch knockout George Groves at Wembley?',
					a: ['35,000', '24,000', '80,000', '30,000'],
					u: null,
					c: 2,
					m: '80,000',
					r: null
				},{
					// Question 5
					q: 'How old was Salvador Sanchez when he passed away?',
					a: ['34', '23', '50', '87'],
					u: null,
					c: 1,
					m: '23',
					r: null
				},{
					// Question 6
					q: 'Who were the acclaimed Four Horsemen of the 80s?',
					a: ['Leonard, Duran, Hearns, Hagler', 'Ruddock, Jones Jr, Berbick, Monzon', 'Pacquiao, Marquez, Morales, Barrera', 'Tyson, Hearns, Holyfied, Pacquaio'],
					u: null,
					c: 0,
					m: 'Leonard, Duran, Hearns, Hagler',
					r: null
				},{
					// Question 7
					q: 'Who was the first African-American heavyweight champion?',
					a: ['Jack Nicklaus', 'Jack Slack', 'Jack Kerouac', 'Jack Johnson'],
					u: null,
					c: 3,
					m: 'Jack Johnson',
					r: null
				},{
					// Question 8
					q: 'Who was the first man to knock down Larry Holmes?',
					a: ['Iran Barkley', 'Georges St. Pierre', 'Earnie Shavers', 'Iran Barkley'],
					u: null,
					c: 2,
					m: 'Earnie Shavers',
					r: null
				},{
					// Question 9
					q: 'Who did Mike Tyson knockout to become undisputed heavyweight champion?',
					a: ['Razor Ruddock', 'Donovan George', 'Trevor Berbick', 'Michael Spinks'],
					u: null,
					c: 3,
					m: 'Michael Spinks',
					r: null
				},{
					// Question 10
					q: 'Who was the tallest heavyweight champion in history?',
					a: ['Primo Carnera', 'Nikolai Valuev', 'Tyson Fury', 'John Ruiz'],
					u: null,
					c: 1,
					m: 'Nikolai Valuev',
					r: null,
				},{
					// Final Results
					q: `LET'S GO TO THE CARDS!`,
					a: [],
					u: null,
					c: null
				}]
	};


function showQuestions(){
	var currentQ = STORE.currentQ;
	$('#qcount').text('Question '+currentQ+' of '+(STORE.questions.length-2));
	$('#question').text(STORE.questions[currentQ].q);
	$('#result').hide();

	if(currentQ == 0){
		$('#qcount').css('visibility', 'hidden');
		STORE.questions[currentQ].a.forEach(function(answer, index){
			var introHTML = `<p>${answer}</p>`;
			$('#intro').append(introHTML);
		});
		$('.ans-line').hide();
		$('#submit').show().text(`Let's Get it On!`);
		$('#continue').hide();
		$('#restart').hide();
	}
	else if(currentQ == 11){
		$('#qcount').css('visibility', 'hidden');
		getFinal();
		for (i = 1; i < STORE.questions.length-1; i++){
				var results = {
					n: i,
					q: STORE.questions[i].q,
					c: STORE.questions[i].a[STORE.questions[i].c],
					u: STORE.questions[i].a[STORE.questions[i].u],
					r: STORE.questions[i].r
				}
			$('#result').fadeIn().html(`
					<span class="tallyScore">Final Score: ${scoreTally} out of 10</span>
					`);
			var resFinal = `	<p class="results"><span class="results-number">${results.n}.</span>
												<span class="results-question">${results.q}</span><br>
												<span class="results-category">Correct Answer:</span> <span class="results-correct">${results.c}</span><br>
												<span class="results-category">Your Answer:</span> <span class="results-user">${results.u}</span><br>
												<span class="results-result">${results.r}</span></p>`;
			$('.ans-line').hide();
			$('#tally-area').hide();
			$('#tally-area').append(resFinal);
			$('#tally-area').fadeIn();
			$('#submit').show().text('Restart');
			$('#continue').hide();
			$('#restart').hide();
		};
	}
	else{
		$('#qcount').css('visibility', 'visible');
		$('#intro').hide();
		$('.ans-line').fadeIn();
		STORE.questions[currentQ].a.forEach(function(answer, index){
			$('label[for="answer'+index+'"]').text(answer);
		});
		$('input[type=radio]').prop('checked', false);
		$('input[type=radio]').prop('required',true);
		$('#score').fadeIn().html(`
			<span class="tallyScore">Score: ${scoreTally}/10</span>
			`);
		$('#submit').show().text('Submit');
		$('#continue').hide();
		$('#restart').show();
	}
	console.log('Question Number: '+currentQ);
}


function answerListen(form){
	form.on('change','input[type=radio]', userSelect)
		.on('submit', submitSelect);
}

function userSelect(event){
	STORE.currentUserAnswer = Number($('input:checked').val());
	return STORE.currentUserAnswer;
}

function submitSelect(event){
	event.preventDefault();

	if(STORE.currentQ == 11 ){
		console.log('RESTART');
		window.location.href='';
	}
	else if(STORE.currentQ == 0){
		console.log('BEGIN');
		showQuestions(STORE.currentQ += 1);
	}
	else{
		console.log('SUBMIT');
		storeUserAnswer(userSelect());
		checkUserAnswer(userSelect());

	}
}

function storeUserAnswer(answer){
	STORE.questions[STORE.currentQ].u = answer;
}


var scoreTally = 0;

function checkUserAnswer(userAnswer){
	if(userAnswer == STORE.questions[STORE.currentQ].c){
		STORE.questions[STORE.currentQ].r = 'Correct';
		console.log(`CORRECT! LET'S GO CHAMP!`);
		scoreTally++;
		console.log(scoreTally);
		$('#result').removeClass('incorrect').addClass('correct').html(`
			<span>CORRECT! LET'S GO CHAMP!</span><br>
			<img src="https://cdn.herb.co/wp-content/uploads/2018/01/Shannon-RIggs-800x400.jpg" class="img-resize" alt="correct">`);
		displayResult()
	}
	else {
		STORE.questions[STORE.currentQ].r = 'Incorrect';
		console.log('WRONG! GET BACK UP!');
		$('#result').removeClass('correct').addClass('incorrect').html(`
			<span>WRONG! GET BACK UP!</span><br>
			<img src="https://uproxx.files.wordpress.com/2017/09/golovkin-stevens.jpg?quality=95" class="img-resize" alt="incorrect"><br>
			<span>The correct answer was: ${STORE.questions[STORE.currentQ].m}</span>`);
		displayResult()
	}
}


function displayResult(result){
	$('.ans-line').hide();
	$('#submit').hide();
	$('#result').fadeIn();
	$('#result > p').text(result);
	$('#continue').show().unbind('click').click(function(e){
		e.preventDefault();
		console.log('currentq +1')
		showQuestions(STORE.currentQ += 1);
	});
}

function getFinal(){
	var resultsArray=[];
	for(i = 1 ; i < STORE.questions.length-1; i++){
		var question = STORE.questions[i].q;
		var answerNum = STORE.questions[i].u;
		var answerStr = STORE.questions[i].a[answerNum];
		resultsArray.push( {q:question, a:answerStr} );
	}
	return STORE.questions[11].a = resultsArray;
}

$(function(){
	showQuestions();
	answerListen($('form'));
	$('.no-fouc').removeClass('no-fouc');
});
