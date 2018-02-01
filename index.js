/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
            ],
            SKILL_NAME: 'Seelenruhe',
            HELP_REPROMPT: 'What can I help you with?',
            //INTRODUCTION_MESSAGE: 'Tai Chi is is a Chinese martial art practiced for both its defense training and its health benefits. Although originally conceived as a martial art, it is also typically practiced for achieving greater longevity and old age physical health. Some training forms of Tai Chi are especially known for being practiced with slow movements and therefore are great for aging bodies. Practicing tai chi improves physical health such as improved strength, mobility and balance: as well as mental health as it is meditative.Seelenruhe is your audio assistant that helps you walk you through these exercises. Explaining step by step, Seelenruhe describes the steps and helps you follow them correctly.',
            STOP_MESSAGE: 'Thank you for taking the time to improve your body and soul. Hope to see you tomorrow for your daily exercise, Goodbye!',
            //WELCOME_MESSAGE: 'Welcome to Seelenruhe, your personal assistant for rejuvenating Tai Chi and meditation exercises',
            //EXERCISE_MESS: 'Alright! Before you start your exercise let’s go through the essentials. Please stand up straight and adjust your stance according to the points below: ',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
            ],
            SKILL_NAME: 'Seelenruhe',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to Seelenruhe, your personal assistant for rejuvenating Tai Chi and meditation exercises. Say Introduction if you would like to hear an introduction? or say Skip if you dont want to');
    },
    
    'GetIntroduction': function () {
        this.emit('Intro');
    },
    'Intro': function () {
        this.emit(':ask', 'Tai Chi is a Chinese martial art practiced for both its defense training and its health benefits. Although originally conceived as a martial art, it is also typically practiced for achieving greater longevity and old age physical health. Some training forms of Tai Chi are especially known for being practiced with slow movements and therefore are great for aging bodies. If you are ready to start exercising? Say start');
    },
    
    'NoIntroduction': function () {
        this.emit('NoIntro');
    },
    'NoIntro': function () {
        // Create speech output
        //const speechOutput = this.t('INTRODUCTION_MESSAGE');
        //this.emit(':tell', speechOutput);
        this.emit(':ask', 'Okay, no introduction, If you are ready to start exercising? Say start');
    },
    
    'ReadyIntent': function () {
        this.emit('YesReady');
    },
    'YesReady': function () {
        // Create speech output
        //const speechOutput = this.t('INTRODUCTION_MESSAGE');
        //this.emit(':tell', speechOutput);
        this.emit(':ask', 'Okay, Are you feeling weak or fatigued today?');
    },
    
    'TheyWeak': function () {
        this.emit('Weakkkk');
    },
    'Weakkkk': function () {
        // Create speech output
        //const speechOutput = this.t('INTRODUCTION_MESSAGE');
        //this.emit(':tell', speechOutput);
        var audioFile = "Let's start our exercise, Keep your stance relaxed and follow the instructors directions. Best of luck and stay healthy <audio src='https://s3-eu-west-1.amazonaws.com/seelenruhestorage/Narration1.mp3' /> Do you like this exercise?";
        this.emit(':ask', audioFile,'try again');
    },
    
    'TheyNotWeak': function () {
        this.emit('NotWeak');
    },
    'NotWeak': function () {
        // Create speech output
        //const speechOutput = this.t('INTRODUCTION_MESSAGE');
        //this.emit(':tell', speechOutput);
        var audioFile = "Let's start our exercise, Keep your stance relaxed and follow the instructors directions. Best of luck and stay healthy <audio src='https://s3-eu-west-1.amazonaws.com/seelenruhestorage/Narration2.mp3' /> Do you like this exercise?";
        this.emit(':ask', audioFile,'try again');
    },
    
    'FeedbackIntent': function () {
        this.emit('UserFeedback');
    },
    'UserFeedback': function () {
        // Create speech output
        //const speechOutput = this.t('INTRODUCTION_MESSAGE');
        //this.emit(':tell', speechOutput);
        //var audioFile = "<audio src='https://s3-eu-west-1.amazonaws.com/seelenruhestorage/Narration1.mp3' /> Do you like this exercise?";
        this.emit(':tell','Thank you for your feedback. I will remember your preference for the next time');
    },
    
    'NotReadyIntent': function () {
        this.emit('NoRea');
    },
    'NoRea': function () {
        // Create speech output
        //const speechOutput = this.t('INTRODUCTION_MESSAGE');
        //this.emit(':tell', speechOutput);
        this.emit(':ask', 'Do you want to go through the essentials again?');
    },
    
    'GoBackToEssentials': function () {
        this.emit('ExerciseStart');
    },
    
    'DontStartExercise': function () {
        this.emit('NoExercise');
    },
    'NoExercise': function () {
        this.emit(':tell', 'Okay, no problem. You can reopen Seelenruhe when you ready to exercise');
    },
    
    'ExerciseStart': function () {
        this.emit(':ask', 'Alright! Before you start your exercise let’s move into the right stance <break time="1s" /> Please stand up straight and follow my instructions <break time="0.3s" /> Lets start <break time="1s" /> Keep your head still and upright and Focus your eyes in the direction of your primary hand. <break time="1s" /> Close your mouth and with your tounge touch the roof of your mouth. <break time="1s" /> Make sure your body is centered and upright. <break time="1s" /> Arch your chest and slightly round your back without hunching it. <break time="1s" /> Loosen the tension around your waist and hips. <break time="1s" /> Relax and lower your shoulders and your elbows. <break time="1s" /> Extend your fingers but keep your wrists relaxed. <break time="0.3s" />Now we can continue to the workout. Say ready if you are ready to start the workout?');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
