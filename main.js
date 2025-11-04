// Main JavaScript for CyberSafe Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Quiz functionality
    const quizData = [
        {
            question: "What is the most secure way to create a password?",
            options: [
                "Use your pet's name",
                "Use a combination of uppercase, lowercase, numbers, and symbols",
                "Use the same password for all accounts",
                "Write it down on a sticky note"
            ],
            correct: 1
        },
        {
            question: "What should you do if you receive a suspicious email asking for personal information?",
            options: [
                "Reply with the requested information",
                "Click on any links to verify the sender",
                "Delete the email without responding",
                "Forward it to all your contacts to warn them"
            ],
            correct: 2
        },
        {
            question: "Which of these is a sign of a phishing attempt?",
            options: [
                "The email uses your correct name",
                "The sender's email address looks legitimate",
                "Urgent language demanding immediate action",
                "The message contains no spelling errors"
            ],
            correct: 2
        },
        {
            question: "What is two-factor authentication?",
            options: [
                "Using two different passwords for the same account",
                "A security process that requires two different forms of identification",
                "Having two separate user accounts on the same device",
                "Using both fingerprint and face recognition on your phone"
            ],
            correct: 1
        },
        {
            question: "When using public Wi-Fi, what should you avoid?",
            options: [
                "Checking the weather",
                "Reading news articles",
                "Online banking or shopping",
                "Watching videos"
            ],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = new Array(quizData.length).fill(null);

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQuestionElement = document.getElementById('current-question');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    function loadQuestion() {
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;
        optionsElement.innerHTML = '';
        
        currentQuizData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option');
            if (userAnswers[currentQuestion] === index) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(optionElement);
        });
        
        currentQuestionElement.textContent = currentQuestion + 1;
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
        
        prevButton.disabled = currentQuestion === 0;
        nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
    }

    function selectOption(index) {
        userAnswers[currentQuestion] = index;
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');
        
        // Update score if the answer is correct
        if (index === quizData[currentQuestion].correct) {
            if (userAnswers[currentQuestion] !== quizData[currentQuestion].correct) {
                score++;
            }
        } else {
            if (userAnswers[currentQuestion] === quizData[currentQuestion].correct) {
                score--;
            }
        }
        scoreElement.textContent = `Score: ${score}`;
    }

    function showNextQuestion() {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            // Quiz finished
            alert(`Quiz completed! Your score: ${score}/${quizData.length}`);
            // Reset quiz
            currentQuestion = 0;
            score = 0;
            userAnswers.fill(null);
            scoreElement.textContent = `Score: ${score}`;
            loadQuestion();
        }
    }

    function showPrevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPrevQuestion);
        nextButton.addEventListener('click', showNextQuestion);
    }

    // Initialize quiz
    if (questionElement) {
        loadQuestion();
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .topic-card, .resource-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.feature-card, .topic-card, .resource-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check in case elements are already in view
    animateOnScroll();
});
