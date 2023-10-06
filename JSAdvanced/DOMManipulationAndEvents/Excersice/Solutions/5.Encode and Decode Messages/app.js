function encodeAndDecodeMessages() {

    // Encode And Decode Functions

    function encodeFunc() {
        const messagesInputsElements = document.querySelectorAll('#main>div>textarea');
        const messageInput = messagesInputsElements[0];
        const receivedMessages = messagesInputsElements[1];

        let textToEncode = messageInput.value;
        let encodedText = '';

        for (let i = 0; i < textToEncode.length; i++) {
            const word = textToEncode[i];
            for (let j = 0; j < word.length; j++) {
                const element = word[j];
                let elementIndex = element.codePointAt(0);
                encodedText += String.fromCodePoint(elementIndex + 1)
            }
        }
        receivedMessages.value = encodedText;
        messageInput.value = '';
    }

    function decodeFunc() {
        const messagesInputsElements = document.querySelectorAll('#main>div>textarea');
        const messageInput = messagesInputsElements[0];
        const receivedMessages = messagesInputsElements[1];

        let textToDecode = receivedMessages.value;
        let decodedText = '';

        for (let i = 0; i < textToDecode.length; i++) {
            const word = textToDecode[i];
            for (let j = 0; j < word.length; j++) {
                const element = word[j];
                let elementIndex = element.codePointAt(0);
                decodedText += String.fromCodePoint(elementIndex - 1)
            }
        }
        receivedMessages.value = decodedText;
    }

    const buttonElements = document.querySelectorAll('#main>div>button');
    const encodeAndSendButton = buttonElements[0].addEventListener('click', encodeFunc);
    const decodeAndReadButton = buttonElements[1].addEventListener('click', decodeFunc);

}