(function(){
    'use strict';

    angular.module("medicine").factory("pickListService", ["pickListEntity", "pickListRepository", "utilitiesService","maximumPickListMatchesToDisplay", pickListService]);

    function pickListService(pickListEntity, pickListRepository, utilitiesService, maximumPickListMatchesToDisplay){

        var pickLists = [];
        var maximumWordMatches = 8;

        function getDefaultPickLists()
        {
            return [
                new pickListEntity.PickList(1, "Referral Reason", true, false, false, false, [
                    new pickListEntity.CategoryValue(1,"All",[])
                ]),

                new pickListEntity.PickList(4, "Referral source", true, false, false, false, [
                    new pickListEntity.CategoryValue(1,"All",[])
                ]),

                new pickListEntity.PickList(5, "New / Follow-up", false, false, false, false, [
                    new pickListEntity.CategoryValue(1,"All",['New', 'Follow-up'])
                ]),

                new pickListEntity.PickList(6, "Procedures",false, true, false, false, [
                    new pickListEntity.CategoryValue(1,"Aspiration, drainage, and biopsy",[
                        'Ascitic drain',
                        'Ascitic tap',
                        'Bone marrow aspirate',
                        'Fine needle aspirate',
                        'Joint aspiration',
                        'Lumbar puncture',
                        'Pleural drain',
                        'Pleural tap'
                    ]),
                    new pickListEntity.CategoryValue(2, "Emergency", [
                        'CPR',
                        'DCCV cardioversion',
                        'Non-invasive ventilation',
                        'Pacing - Percutaneous',
                        'Pacing - Temporary Transvenous Wire',
                        'Pericardial drainage'
                    ]),
                    new pickListEntity.CategoryValue(3, "Lines / Vascular access", [
                        'Arterial line',
                        'Central line',
                        'Pulmonary Artery Catheter',
                        'VasCath'
                    ]),
                    new pickListEntity.CategoryValue(4, "Specialist procedures", [])
                ]),

                new pickListEntity.PickList(7, "Indication", true, false, false, false, [
                    new pickListEntity.CategoryValue(1,"All",[])
                ]),

                new pickListEntity.PickList(8, "Complications", true, false, false, false, [
                    new pickListEntity.CategoryValue(1,"All",[])
                ]),

                new pickListEntity.PickList(2, "Presentation", true, true, false, false, [
                    new pickListEntity.CategoryValue(1,"All",[
                        'Acute back pain',
                        'Abdominal Mass, Hepatomegaly, or splenomegaly',
                        'Abnormal sensation (paraesthesia & numbness)',
                        'Acute kidney injury',
                        'Aggressive / Disturbed behaviour',
                        'Alcohol / Substance Dependance',
                        'Anxiety / Panic Disorder',
                        'Blackout / collapse',
                        'Breathlessness',
                        'Bruising / Spontaneous bleeding',
                        'Chest pain',
                        'Chronic kidney disease',
                        'Confusion (Acute/Delirium)',
                        'Cough',
                        'Dialysis',
                        'Diarrhoea',
                        'Dyspepsia',
                        'Dysuria',
                        'Falls',
                        'Fever',
                        'Fits / Seizure',
                        'Genital Discharge / Ulceration',
                        'Haematemesis / Malaena',
                        'Haematuria',
                        'Haemoptysis',
                        'Head Injury',
                        'Headache',
                        'Hoarseness / stridor',
                        'Hypothermia',
                        'Immobility',
                        'Incidental findings',
                        'Involuntary Movements',
                        'Jaundice',
                        'Joint Swelling',
                        'Limb pain / Swelling',
                        'Loin Pain',
                        'Lymphadenopathy',
                        'Medical Problems / Complications following surgical procedures',
                        'Medical Problems in Pregnancy',
                        'Memory Loss (progressive)',
                        'Micturition difficulties',
                        'Neck pain',
                        'Palliation / End of life care',
                        'Palpitations',
                        'Physical symptoms in absence of organic disease',
                        'Poisoning',
                        'Polydipsia',
                        'Polyuria',
                        'Pruritus',
                        'Rash',
                        'Rectal bleeding',
                        'Skin / Mouth ulcers',
                        'Speech disturbance',
                        'Suicidal ideation',
                        'Swallowing difficulties',
                        'Syncope / Pre-syncope',
                        'Unsteadiness / Balance disturbance',
                        'Visual disturbance (diplopia, visual field deficit, or reduced acuity)',
                        'Vomiting / Nausea',
                        'Weakness / Paralysis',
                        'Weight loss',
                        'Abdominal pain'
                    ])]),
                new pickListEntity.PickList(3, "Diagnoses", false, false, false, true, [
                    new pickListEntity.CategoryValue(1, "All", [
                    ])
                ])];
        }

        function loadPickLists()
        {
            if (pickLists.length > 0) {return;}

            if (!pickListRepository.havePicksListsEverBeenSaved())
            {
                pickLists = getDefaultPickLists();
                return;
            }

            var pickListJson = pickListRepository.getAllAsJson();

            if (typeof(Worker) !== "undefined")
            {
                var worker = new Worker("js/WebWorkers/pickListLoadWorker.js");
                worker.postMessage(pickListJson);
                worker.onmessage = onPickListDeserialised;
            }
            else
            {
                pickLists = JSON.parse(pickListJson);
            }
        }

        function onPickListDeserialised(e)
        {
            pickLists = e.data;
        }

/*        function persistPickLists(pickListJson)
        {
            if (!pickListJson)
            {
                pickListJson = angular.toJson(pickLists);
            }
            pickListRepository.saveAll(pickListJson);
        }*/
        
        function getById(pickListId)
        {
            return _(pickLists).find(function(list) {return list.id === pickListId;});
        }

        function getCategory(pickListId, categoryId)
        {
            var pickList = getById(pickListId);
            return _(pickList.categories)
                .find(function(category) {return category.id === categoryId;})
        }

        function wordMatches(pickListId, searchTerms, categoryId)
        {
            if (!searchTerms.partialWord) {return [];}

            var pickList = getById(pickListId);

            var searchText = searchTerms.partialWord.toLowerCase();

            var requiredWords = lowerCaseArray(searchTerms.completeWords);

            var value;
            var wordMatches = [];
            var numberOfRequiredWords = requiredWords.length;
            var searchTextLength;
            var searchTextMatches;
            var searchTextMatch;
            var isNotInFilteredCategory;

            for (var valueIndex = 0; valueIndex < pickList.values.length; valueIndex++)
            {
                value = pickList.values[valueIndex];

                isNotInFilteredCategory = categoryId && value.categoryId !== categoryId;

                if (isNotInFilteredCategory) { continue; }

                if (doesNotMatchRequiredWords(value, requiredWords, numberOfRequiredWords)) { continue; }

                searchTextLength = searchText.length;

                searchTextMatches = _(value.words).filter(function(word){

                   if (requiredWords.indexOf(word) > -1) {return false;}
                   return word.substring(0, searchTextLength) === searchText;
                });

                for (var i = 0; i < searchTextMatches.length; i++ )
                {
                    searchTextMatch = searchTextMatches[i];
                    if (wordMatches.indexOf(searchTextMatch) === -1)
                    {
                        wordMatches.push(searchTextMatch);
                    }
                }

                if (wordMatches.length >= maximumWordMatches) {break;}
            }
            return wordMatches;
        }

        function valueMatches(pickListId, searchTerms, categoryId)
        {
            var pickList = getById(pickListId);
            var valueMatches = [];
            var value;
            var isNotInFilteredCategory;
            var requiredWordsLowered = lowerCaseArray(searchTerms.completeWords);
            var numberOfRequiredWords = requiredWordsLowered.length;
            var partialWord = searchTerms.partialWord ? searchTerms.partialWord.toLowerCase() : "";
            var partialWordLength = partialWord.length;

            for (var i = 0; i < pickList.values.length; i++)
            {
                value = pickList.values[i];

                isNotInFilteredCategory = categoryId && value.categoryId !== categoryId;

                if (isNotInFilteredCategory) { continue; }

                if (doesNotMatchRequiredWords(value, requiredWordsLowered, numberOfRequiredWords)) { continue; }

                if (doesNotMatchPartialWord(value, requiredWordsLowered, partialWord, partialWordLength)) { continue; }

                valueMatches.push(value);
                if (valueMatches.length >= maximumPickListMatchesToDisplay) {break;}
            }

            return _(valueMatches).sortBy(function(val){return val.text.toLowerCase();});
        }

        function doesNotMatchPartialWord(pickListValue, requiredWords, partialWord, partialWordLength)
        {
            if (!partialWord) { return false; }

            var word;
            for(var i = 0; i < pickListValue.words.length; i++)
            {
                word = pickListValue.words[i];
                if (requiredWords.indexOf(word) > -1) {continue;}

                if (word.substring(0, partialWordLength) === partialWord) {return false;}
            }
            return true;
        }


        function lowerCaseArray(items)
        {
            return _(items).map(function(item) {return item.toLowerCase();});
        }


        function doesNotMatchRequiredWords(value, requiredWords, numberOfWords)
        {
            var requiredWord;
            for (var i = 0; i < numberOfWords; i++)
            {
                requiredWord = requiredWords[i];
                if (value.words.indexOf(requiredWord) === -1)
                {
                    return true;
                }
            }
            return false;
        }

        function incrementCount(pickListId, value)
        {
            value.count ++;

            var pickList = getById(pickListId);
            var currentIndex = pickList.values.indexOf(value);

            for (var i = currentIndex; i > 0; i--)
            {
                if (pickList.values[i-1].count >= value.count)
                {
                    break;
                }
            }

            if (i < currentIndex)
            {
                utilitiesService.moveItemsInArray(pickList.values,currentIndex, i);
            }
         }


        function findByText(pickListId, text, categoryId)
        {
            if (!text) {return null;}
            var loweredText = text.toLowerCase();

            var pickList = getById(pickListId);
            categoryId = tidy(categoryId);

            return _(pickList.values).find(function(val){
               return tidy(val.categoryId) == categoryId &&
                      val.text.toLowerCase() == loweredText;
            });
        }

        function tidy(value)
        {
            return !value ? 0 : value;
        }


        function addNewValue(pickListId, text, categoryId)
        {
            var existingValue = findByText(pickListId, text, categoryId);

            if (existingValue) {return existingValue;}

            var pickList = getById(pickListId);
            var newValue = new pickListEntity.PickValue(text, categoryId);
            pickList.values.push(newValue);
            return newValue;
        }

        function getAll()
        {
            return pickLists;
        }

        return {
            loadPickLists: loadPickLists,
            getById: getById,
            getCategory: getCategory,
            wordMatches: wordMatches,
            valueMatches: valueMatches,
            incrementCount: incrementCount,
            addNewValue: addNewValue,
            findByText: findByText,
            getAll: getAll
        };
    }
})();