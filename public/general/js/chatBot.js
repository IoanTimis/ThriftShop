$(document).ready(function() {
    var $chatbotForm = $('#chatbotForm');
    var $chatbotMessages = $('#chatbotMessages');

    $chatbotForm.on('submit', function(e) {
        e.preventDefault();

        var message = $('#chatbotInput').val();
        var csrf_token = $("input[name='csrf_token']").val();
        if (!message.trim()) {
            alert('Mesajul nu poate fi gol!');
            return;
        }

        $chatbotMessages.append(
            `<div class="message user-message">
                <p>${message}</p>
            </div>`
        );

        $.ajax({
            url: '/chatbot/message',
            method: 'POST',
            data: { 
                message: message,
                csrf_token: csrf_token
             },
            success: function(response) {
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

        $('#chatbotInput').val('');
    });
});
