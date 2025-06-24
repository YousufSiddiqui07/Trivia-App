import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default class App extends Component {
    state = {
        currentQuestionIndex: 0,
        score: 0,
        showMainPage: true,
        showTriviaPage: false,
        showResultPage: false,
        isAnswerCorrect: null,
        quizFinished: false,
        quizQuestions: [],
    }

    questions = [
        { question: "Zurich is the largest city in which country?", options: ["Belgium", "Switzerland", "Japan", "United States of America"], correctAnswer: 1 },
        { question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2 },
        { question: "Which planet is considered the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correctAnswer: 2 },
        { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correctAnswer: 2 },
        { question: "Which language is primarily spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "English"], correctAnswer: 1 },
        { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 1 },
        { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Osmium", "Oganesson"], correctAnswer: 1 },
        { question: "In what year did the Titanic sink?", options: ["1912", "1905", "1898", "1923"], correctAnswer: 0 },
        { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correctAnswer: 2 },
        { question: "Which company created the iPhone?", options: ["Google", "Apple", "Microsoft", "Samsung"], correctAnswer: 1 },
        { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Tiger", "Leopard"], correctAnswer: 0 },
        { question: "Which is the largest ocean on Earth?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correctAnswer: 1 },
        { question: "What does the chemical formula H₂O represent?", options: ["Oxygen", "Water", "Hydrogen", "Salt"], correctAnswer: 1 },
        { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: 1 },
        { question: "Who was the first president of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correctAnswer: 1 },
        { question: "In which country is Mount Everest located?", options: ["India", "Nepal", "China", "Bhutan"], correctAnswer: 1 },
        { question: "What is the currency used in Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], correctAnswer: 2 },
        { question: "Which of the following is a mammal?", options: ["Shark", "Dolphin", "Octopus", "Tuna"], correctAnswer: 1 },
        { question: "Which is the largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Uranus"], correctAnswer: 2 },
        { question: "Which of the following is a primary color?", options: ["Green", "Red", "Black", "Purple"], correctAnswer: 1 },
        { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Rembrandt"], correctAnswer: 1 },
        { question: "Which gas makes up most of the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 2 },
        { question: "Which organ in the human body pumps blood?", options: ["Liver", "Heart", "Lungs", "Kidneys"], correctAnswer: 1 },
        { question: "At what temperature does water boil?", options: ["90°C", "100°C", "110°C", "120°C"], correctAnswer: 1 },
        { question: "What type of celestial body is the Sun?", options: ["Planet", "Star", "Comet", "Moon"], correctAnswer: 1 },
        { question: "Which of the following animals is a reptile?", options: ["Frog", "Lizard", "Shark", "Penguin"], correctAnswer: 1 },
        { question: "Which of these animals can fly?", options: ["Bat", "Dog", "Whale", "Dolphin"], correctAnswer: 0 },
        { question: "What are the main requirements for photosynthesis?", options: ["Water", "Light", "Carbon Dioxide", "All of the above"], correctAnswer: 3 },
        { question: "Which of the following is a famous physicist?", options: ["Isaac Newton", "Charles Darwin", "Albert Einstein", "Both Newton and Einstein"], correctAnswer: 3 },
        { question: "At what temperature does water freeze?", options: ["0°C", "10°C", "32°C", "100°C"], correctAnswer: 0 }
    ];

    startQuiz = () => {
        const shuffled = [...this.questions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        this.setState({
            quizQuestions: selected,
            showMainPage: false,
            showTriviaPage: true,
            currentQuestionIndex: 0,
            score: 0,
            showResultPage: false,
            quizFinished: false,
        });
    }

    answerChoice = (index) => {
        const { currentQuestionIndex, score, quizQuestions } = this.state;
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const isCorrect = index === currentQuestion.correctAnswer;

        this.setState({
            isAnswerCorrect: isCorrect,
            score: isCorrect ? score + 1 : score,
            showTriviaPage: false,
            showResultPage: true,
        });
    }

    nextQuestion = () => {
        const nextIndex = this.state.currentQuestionIndex + 1;
        if (nextIndex < this.state.quizQuestions.length) {
            this.setState({
                currentQuestionIndex: nextIndex,
                showTriviaPage: true,
                showResultPage: false,
                isAnswerCorrect: null,
            });
        } else {
            this.setState({
                showTriviaPage: false,
                showResultPage: true,
                quizFinished: true
            });
        }
    }

    render() {
        const { currentQuestionIndex, showMainPage, showTriviaPage, showResultPage, isAnswerCorrect, score, quizFinished, quizQuestions } = this.state;
        const currentQuestion = quizQuestions[currentQuestionIndex];

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Text style={styles.title}>Trivia Master</Text>

                {showMainPage && (
                    <View style={styles.card}>
                        <Text style={styles.instructions}>Ready to test your brain? 🧠</Text>
                        <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
                            <Text style={styles.buttonText}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {showTriviaPage && currentQuestion && (
                    <View style={styles.card}>
                        <Text style={styles.question}>{currentQuestion.question}</Text>
                        {currentQuestion.options.map((option, idx) => (
                            <TouchableOpacity key={idx} style={styles.answerButton} onPress={() => this.answerChoice(idx)}>
                                <Text style={styles.answerText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {showResultPage && !quizFinished && (
                    <View style={styles.card}>
                        <Text style={[styles.resultText, { color: isAnswerCorrect ? 'green' : 'red' }]}>
                            {isAnswerCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                        </Text>
                        <Text style={styles.instructions}>Score: {score}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.nextQuestion}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {showResultPage && quizFinished && (
                    <View style={styles.card}>
                        <Text style={styles.instructions}>🎉 Quiz Finished!</Text>
                        <Text style={styles.instructions}>Final Score: {score}/{quizQuestions.length}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
                            <Text style={styles.buttonText}>Restart</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0F24',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#1E2749',
        padding: 20,
        borderRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    },
    question: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 15,
    },
    resultText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    answerButton: {
        backgroundColor: '#334973',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 10,
    },
    answerText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    }
});