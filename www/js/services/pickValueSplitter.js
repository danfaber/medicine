(function(){
    'use strict';

    angular.module("medicine").factory("pickValueSplitter", [pickValueSplitter]);

    function pickValueSplitter(){

        var wordsToIgnore = ['and', 'the', 'of', 'or', 'a'];

        function splitSentence(sentence)
        {

            try {
                sentence = sentence.toLowerCase();

            }
            catch(err) {
                var x = 100;
            }


            sentence = replacePunctuationWithSpaces(sentence);

            sentence = trimWhitespace(sentence);

            var words = sentence.split(" ");

            return _(words).without(wordsToIgnore);
        }

        function replacePunctuationWithSpaces(sentence)
        {
            var nonWordRegex = /\W/g;
            return sentence.replace(nonWordRegex," ");
        }

        function trimWhitespace(sentence)
        {
            sentence = sentence.replace("  "," ");
            return sentence.trim();
        }

        return {
            splitSentence: splitSentence
        };
    }
})();
