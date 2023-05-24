function validate() {
    const inputFieldElement = document.getElementById('email');
    inputFieldElement.addEventListener('change', validationCheck);


    // Helper functions
    function containsUppercase(string) {
        if (string === undefined || string == '') {
            return undefined;
        } else {
            return Boolean(string.match(/[A-Z]/));
        }
    }
    function canSplitWithAt(string) {
        if (string !== undefined && string.includes('@')) {
            return string.split('@')
        } else {
            return [undefined, undefined];
        }
    }
    function canSplitWithDot(string) {
        if (string !== undefined && string.includes('.')) {
            return string.split('.')
        } else {
            return [undefined, undefined];
        }
    }
    function containsSpacesOnly(string) {
        if (string === undefined || string == '') {
            return undefined;
        } else {
            return Boolean(string.match(/^\s*$/));
        }
    }


    function validationCheck(e) {
        let target = e.target;
        const inputEmailValue = inputFieldElement.value;
        let [name, domainAndExtension] = canSplitWithAt(inputEmailValue);
        let [domain, extension] = canSplitWithDot(domainAndExtension);

        containsUppercase(name) || containsSpacesOnly(name) ? name = undefined : name = name;
        containsUppercase(domain) || containsSpacesOnly(domain) ? domain = undefined : domain = domain;
        containsUppercase(extension) || containsSpacesOnly(extension) ? extension = undefined : extension = extension;


        if (!name || !domain || !extension) {
            target.className = 'error';
        } else {
            target.className = '';
        }

    }
}