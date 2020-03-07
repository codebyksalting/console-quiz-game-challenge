(function() {

    // Example of aFunction Constructor
    function Question(question, choices, correctAnswer){
        this.question = question,
        this.choices = choices,
        this.correctAnswer = correctAnswer
    }

    // Example of adding methods using the prototype chain. This make the method available only to whichever object needs it.
    Question.prototype.displayQuestion = function(){
        console.log(this.question);
        for(var i = 0; i < this.choices.length; i++){
            console.log(i + ': ' + this.choices[i]);
        }
    }

    Question.prototype.isCorrect = function(answer, callback) {
        var sc;

        if (answer === this.correctAnswer) {
            console.log('Your answer is correct!');
            sc = callback(true);
        } else {
            console.log('Your answer is wrong. Please try again :)');
            sc = callback(false);
        }
        
        this.showScore(sc);
    }

    Question.prototype.showScore = function(currentScore) {
        console.log('Your current score is: ' + currentScore);
        console.log('-------------------------------');
    }

    function generateQuestion(questions) {
        var randomQuestionIndex = Math.floor(Math.random() * questions.length);

        questions[randomQuestionIndex].displayQuestion();

        var answer = prompt('Please enter your answer.');

        if (answer !== 'exit') {
            // NOTE: Make sure to pass the answer as an integer for the validation to work
            questions[randomQuestionIndex].isCorrect(parseInt(answer), countScore);
            // Call the function again to keep the game going
            generateQuestion(questions);
        }
    }

    // Example of closure. Use closure to track the score. This removes the need for global variables and variable mutation
    function scoreCounter() {
        var score = 0;
        return function(correct) {
            if (correct) {
                score++;
            }
            return score;
        }
    }
    var countScore = scoreCounter();

    // Add the questions
    var questions = [];
    questions.push(new Question(
        'What is the value of pi?', 
        ['3.12', '3.14', '3.18'], 
        1));
    questions.push(new Question(
        'What do you call a triangle with equal sides?', 
        ['Isosceles Triangle', 'Scalene Triangle', 'Equilateral Triangle'], 
        2));
    questions.push(new Question(
        'What do you call one half of a cirle\'s diameter?', 
        ['Circumference', 'Radius', 'Tangent'], 
        1));

    // Init question generation
    generateQuestion(questions);

})();