// Elementos DOM
        const audioElement = document.getElementById('backgroundAudio');
        const audioToggle = document.getElementById('audioToggle');
        const playButtonContainer = document.getElementById('playButtonContainer');
        const playButton = document.getElementById('playButton');
        const audioIcon = document.querySelector('.audio-icon');

        // Estados
        let isPlaying = false;
        let hasInteracted = false;

        // Função para alternar o áudio
        function toggleAudio() {
            if (!hasInteracted) {
                hasInteracted = true;
            }

            // Garantir volume reduzido antes de tocar
            audioElement.volume = 0.25;

            if (isPlaying) {
                audioElement.pause();
                isPlaying = false;
                audioIcon.classList.remove('playing');
                audioIcon.classList.add('muted');
                audioIcon.classList.remove('fa-volume-up');
                audioIcon.classList.add('fa-volume-mute');
            } else {
                audioElement.play()
                    .then(() => {
                        isPlaying = true;
                        audioIcon.classList.add('playing');
                        audioIcon.classList.remove('muted');
                        audioIcon.classList.remove('fa-volume-mute');
                        audioIcon.classList.add('fa-volume-up');
                    })
                    .catch(error => {
                        console.error('Erro ao reproduzir áudio:', error);
                        alert('Não foi possível reproduzir o áudio. Verifique se o arquivo está disponível.');
                    });
            }
            
            // Esconder o botão de play após a primeira interação
            if (hasInteracted) {
                playButtonContainer.classList.add('hidden');
            }
        }

        // Event listeners
        audioToggle.addEventListener('click', toggleAudio);
        playButton.addEventListener('click', toggleAudio);

        // Tentar reproduzir automaticamente com volume reduzido
        window.addEventListener('load', async () => {
            // definir volume mais baixo antes de tentar reproduzir
            audioElement.volume = 0.25;
            audioElement.load();
            try {
                await audioElement.play();
                isPlaying = true;
                audioIcon.classList.add('playing');
                audioIcon.classList.remove('muted', 'fa-volume-mute');
                audioIcon.classList.add('fa-volume-up');
                playButtonContainer.classList.add('hidden');
                hasInteracted = true;
            } catch (error) {
                console.log('Autoplay bloqueado:', error);
                // Se o autoplay falhar, o botão de play permanece visível
            }
        });

        // Tratamento de erro de áudio
        audioElement.addEventListener('error', () => {
            console.error('Erro ao carregar áudio');
            playButtonContainer.classList.add('hidden');
        });