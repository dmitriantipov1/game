let arrayByClientLevel = []

let success = 0
let mistake = 0

let level = ''
let wordCount = 0
let language = ''

$(function () {
    $('#arrow').on('click', function () {
        $('.game-menu__list').toggleClass('game-menu__list--active')
        $(this).toggleClass('rotate-arrow')
    })

    //Get user settings
    $('#level input').on('click', function () {
        $('#level input').attr('disabled', false)
        $(this).prop('disabled', true)
        level = $(this).val()
        // Set level in menu
        $('#game-level').text(level)
        //Create a new array from client settings
        arrayByClientLevel = wordsArray.filter((el) => el.level === level)
    })

    $('#wordNumber input').on('click', function () {
        $('#wordNumber input').attr('disabled', false)
        $(this).prop('disabled', true)
        wordCount = $(this).val()
        // Set words number in menu
        $('#game-word-number').text(wordCount)
        // Word counter
        $('#total').text(wordCount)
    })

    $('#language input').on('click', function () {
        $('#language input').attr('disabled', false)
        $(this).prop('disabled', true)
        language = $(this).val()
        // Set language translate in menu
        $('#game-language').text(language)
    })

    function getFirstWord(userArray) {
        if (language === "english") {
            return userArray[0].wordEnglish.toLowerCase()
        } else if (language === "russian") {
            return userArray[0].wordRussian.toLowerCase()
        }

    }

    //Start game
    $('.game-start__btn').on('click', function () {
        if (level && wordCount && language) {
            $('.game-interface').removeClass('hidden')
            $('.game-start').addClass('hidden')
            $('#level, #wordNumber, #language').addClass('hidden')
            $('.game-menu__rules').removeClass('hidden')
        } else {
            $('#main-error').removeClass('hidden')
        }

        //First item in array (first word)
        $('#word-title').text(getFirstWord(arrayByClientLevel))
    })

    $('#check-word').on('click', function () {
        //Input value
        let inputWord = $('.game-interface__input').val()
        const firstRussianWordFromArray = arrayByClientLevel[0].wordRussian.toLowerCase()
        const firstEnglishWordFromArray = arrayByClientLevel[0].wordEnglish.toLowerCase()

        //Compare condition
        if (
            language === "english"
            && inputWord === firstRussianWordFromArray
            || language === "russian"
            && inputWord === firstEnglishWordFromArray
        ) {
            //Add into successful
            $('#success').text(++success)
        } else if (
            language === "english"
            && inputWord !== firstRussianWordFromArray
            || language === "russian"
            && inputWord !== firstEnglishWordFromArray
        ) {
            //Add to mistakes
            $('#mistakes').text(++mistake)
        }

        //Delete first item from array
        arrayByClientLevel.shift()

        //New value of word
        $('#word-title').text(getFirstWord(arrayByClientLevel))

        wordCount--
        $('#total').text(wordCount)

        $('#input').val('')

        if (wordCount === 0) {
            $('.game-results').removeClass('hidden')
            $('.game-interface').addClass('hidden')
            //Final results
            $('#results-of-success').text(success)
            $('#results-of-mistakes').text(mistake)
        }
    })

    $('#start-again').on('click', function () {
        window.location.reload()
    })

    //Logic of hide hints
    $('#get-help-button').on('click', function () {
        $('#help-container').removeClass('hidden')
        $('#image').attr('src', arrayByClientLevel[0].img)
    })

    $('#close-button').on('click', function () {
        $('#help-container').addClass('hidden')
    })
})

