//TODO: Darius: template pentru chatbot
$(document).ready(function() {
    var $chatbotForm = $('#chatbotForm');
    var $chatbotMessages = $('#chatbotMessages');

    $chatbotForm.on('submit', function(e) {
        e.preventDefault();

        var message = $('#chatbotInput').val();
        if (!message.trim()) {
            alert('Mesajul nu poate fi gol!');
            return;
        }

        // Adaugă mesajul utilizatorului în interfață
        $chatbotMessages.append(
            `<div class="message user-message">
                <p>${message}</p>
            </div>`
        );

        // Trimite mesajul către server
        $.ajax({
            url: '/chatbot/message',
            method: 'POST',
            data: { message: message },
            success: function(response) {
                // Adaugă răspunsul chatbot-ului în interfață
                $chatbotMessages.append(
                    `<div class="message bot-message">
                        <p>${response.reply}</p>
                    </div>`
                );
            },
            error: function(error) {
                console.log(error);
                alert('Eroare la comunicarea cu chatbot-ul!');
            }
        });

        // Golește câmpul de input
        $('#chatbotInput').val('');
    });
});
