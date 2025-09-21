document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game');
    const gameContainer = document.getElementById('game-container');
    const gameTitle = document.getElementById('game-title');
    const gameContent = document.getElementById('game-content');
    const affirmation = document.getElementById('affirmation');

    const affirmations = [
        "Your courage shines through every challenge—keep shining!",
        "Each game is a step toward reclaiming your amazing potential.",
        "You are stronger than you know—every try counts!",
        "Your progress is a gift—celebrate it today!"
    ];

    // Set random affirmation
    affirmation.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];

    // Game Logic
    let gameState = {};

    function initGame(gameType) {
        gameTitle.textContent = `Playing ${gameType.charAt(0).toUpperCase() + gameType.slice(1)} Game`;
        gameContent.innerHTML = '';

        switch (gameType) {
            case 'memory':
                gameState = { score: 0, sequence: [1, 2, 3].sort(() => Math.random() - 0.5) };
                gameContent.innerHTML = `
                    <p>Remember this sequence of numbers: ${gameState.sequence.join(', ')}</p>
                    <input type="text" id="memory-input" placeholder="Enter sequence (e.g., 1, 2, 3)">
                    <button onclick="checkMemory()">Submit</button>
                `;
                break;

            case 'speech':
                gameState = { targetWord: ['hello', 'namaste', 'good'][Math.floor(Math.random() * 3)] };
                gameContent.innerHTML = `
                    <p>Say the word: <strong>${gameState.targetWord}</strong> into your microphone.</p>
                    <p><em>(Note: Speech recognition is simulated here; use console to test.)</em></p>
                    <input type="text" id="speech-input" placeholder="Type what you said">
                    <button onclick="checkSpeech()">Submit</button>
                `;
                break;

            case 'culture':
                gameState = { scenario: "What festival uses rangoli?", options: ['Diwali', 'Holi', 'Eid'] };
                gameContent.innerHTML = `
                    <p>${gameState.scenario}</p>
                    <select id="culture-select">
                        ${gameState.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                    <button onclick="checkCulture()">Submit</button>
                `;
                break;

            case 'bollywood':
                gameState = { movie: 'Sholay', props: ['gun', 'horse', 'dhol'] };
                gameContent.innerHTML = `
                    <p>Identify props from the movie: ${gameState.movie}</p>
                    <div class="option-grid">
                        <img src="assets/bollywood1.jpg" alt="Prop 1" onclick="selectProp('gun')">
                        <img src="assets/bollywood2.jpg" alt="Prop 2" onclick="selectProp('horse')">
                        <img src="assets/bollywood1.jpg" alt="Prop 3" onclick="selectProp('dhol')">
                    </div>
                    <p>Selected: <span id="selected-prop"></span></p>
                    <button onclick="checkBollywood()">Submit</button>
                `;
                break;

            case 'dual':
                gameState = { temple: 'Golden Temple', location: 'Amritsar', sequence: [1, 2, 3] };
                gameContent.innerHTML = `
                    <p>Memory: Remember this sequence: ${gameState.sequence.join(', ')}</p>
                    <p>Culture: Where is the ${gameState.temple} located?</p>
                    <input type="text" id="dual-memory" placeholder="Enter sequence">
                    <select id="dual-location">
                        <option value="Amritsar">Amritsar</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                    </select>
                    <button onclick="checkDual()">Submit</button>
                `;
                break;

            case 'family':
                gameState = { currentImage: 0, images: ['assets/family1.jpg', 'assets/family2.jpg'] };
                gameContent.innerHTML = `
                    <div class="image-box">
                        <img src="${gameState.images[gameState.currentImage]}" alt="Family Scenario">
                        <div class="crop-box"><textarea id="family-answer" placeholder="What happened next?"></textarea></div>
                    </div>
                    <div class="option-grid">
                        <img src="assets/family2.jpg" alt="Option 1" onclick="selectImage('assets/family2.jpg')">
                    </div>
                    <button onclick="checkFamily()">Submit</button>
                `;
                break;
        }
    }

    // Check Functions
    window.checkMemory = () => {
        const input = document.getElementById('memory-input').value.split(',').map(n => +n.trim());
        if (JSON.stringify(input) === JSON.stringify(gameState.sequence)) {
            alert('Great job! Your memory is spot on!');
            gameState.score++;
        } else {
            alert('Try again—keep practicing, you’ve got this!');
        }
    };

    window.checkSpeech = () => {
        const input = document.getElementById('speech-input').value.toLowerCase();
        if (input === gameState.targetWord) {
            alert('Wonderful speaking! You nailed it!');
        } else {
            alert('Close! Let’s try again—your voice is getting stronger!');
        }
    };

    window.checkCulture = () => {
        const select = document.getElementById('culture-select').value;
        if (select === 'Diwali') {
            alert('Perfect! You know your festivals well!');
        } else {
            alert('Nice try! Diwali is the rangoli festival—keep learning!');
        }
    };

    window.checkBollywood = () => {
        const selected = document.getElementById('selected-prop').textContent;
        if (gameState.props.includes(selected)) {
            alert(`Yes! ${selected} is from ${gameState.movie}!`);
        } else {
            alert('Not quite—try another prop, you’re doing great!');
        }
    };

    window.checkDual = () => {
        const memoryInput = document.getElementById('dual-memory').value.split(',').map(n => +n.trim());
        const location = document.getElementById('dual-location').value;
        if (JSON.stringify(memoryInput) === JSON.stringify(gameState.sequence) && location === gameState.location) {
            alert('Amazing! You aced memory and location!');
        } else {
            alert('Good effort! Let’s practice a bit more—your progress is shining!');
        }
    };

    window.checkFamily = () => {
        const answer = document.getElementById('family-answer').value;
        const selectedImage = gameState.selectedImage;
        if (answer.toLowerCase().includes('celebration') || selectedImage === 'assets/family2.jpg') {
            alert('Well done! You described the next scene perfectly!');
        } else {
            alert('Great try! The next scene was a celebration—keep imagining!');
        }
    };

    window.selectProp = (prop) => {
        document.getElementById('selected-prop').textContent = prop;
    };

    window.selectImage = (image) => {
        gameState.selectedImage = image;
        document.querySelectorAll('.option-grid img').forEach(img => img.style.borderColor = '#f0f8ff');
        document.querySelector(`.option-grid img[src="${image}"]`).style.borderColor = '#1abc9c';
    };

    // Initialize game based on URL parameter
    if (game) initGame(game);
});
