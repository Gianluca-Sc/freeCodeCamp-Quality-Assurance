const chai = require("chai");
const assert = chai.assert;

const removeHighLight = (text) => {
  const regex = /<[^<>]+>/g;

  return text.replace(regex, "");
};

const Translator = require("../components/translator.js");
const translator = new Translator();
suite("Unit Tests", () => {
  suite("To British English", () => {
    test("Translate: Mangoes are my favorite fruit.", () => {
      const text = "Mangoes are my favorite fruit";
      const expected = "Mangoes are my favourite fruit";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: I ate yogurt for breakfast.", () => {
      const text = "I ate yogurt for breakfast!";
      const expected = "I ate yoghurt for breakfast!";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: We had a party at my friend's condo..", () => {
      const text = "We had a party at my friend's condo..";
      const expected = "We had a party at my friend's flat..";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: Can you toss this in the trashcan for me?", () => {
      const text = "Can you toss this in the trashcan for me?";
      const expected = "Can you toss this in the bin for me?";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: The parking lot was full.", () => {
      const text = "The parking lot was full.";
      const expected = "The car park was full.";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: Like a high tech Rube Goldberg machine", () => {
      const text = "Like a high tech Rube Goldberg machine";
      const expected = "Like a high tech Heath Robinson device";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: To play hooky means to skip class or work.", () => {
      const text = "To play hooky means to skip class or work.";
      const expected = "To bunk off means to skip class or work.";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: No Mr. Bond, I expect you to die.", () => {
      const text = "No Mr. Bond, I expect you to die.";
      const expected = "No Mr Bond, I expect you to die.";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: Dr. Grosh will see you now.", () => {
      const text = "Dr. Grosh will see you now.";
      const expected = "Dr Grosh will see you now.";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });

    test("Translate: Lunch is at 12:15 today.", () => {
      const text = "Lunch is at 12:15 today.";
      const expected = "Lunch is at 12.15 today.";
      assert.equal(
        removeHighLight(translator.americanToBritish(text)),
        expected
      );
    });
  });

  suite("To American English", () => {
    test("Translate: We watched the footie match for a while.", () => {
      const text = "We watched the footie match for a while.";
      const expected = "We watched the soccer match for a while.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: Paracetamol takes up to an hour to work.", () => {
      const text = "Paracetamol takes up to an hour to work.";
      const expected = "Tylenol takes up to an hour to work.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: First, caramelise the onions.", () => {
      const text = "First, caramelise the onions.";
      const expected = "First, caramelize the onions.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: I spent the bank holiday at the funfair.", () => {
      const text = "I spent the bank holiday at the funfair.";
      const expected = "I spent the public holiday at the carnival.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: I had a bicky then went to the chippy.", () => {
      const text = "I had a bicky then went to the chippy.";
      const expected = "I had a cookie then went to the fish-and-chip shop.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: I've just got bits and bobs in my bum bag", () => {
      const text = "I've just got bits and bobs in my bum bag";
      const expected = "I've just got odds and ends in my fanny pack";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: The car boot sale at Boxted Airfield was called off.", () => {
      const text = "The car boot sale at Boxted Airfield was called off.";
      const expected = "The swap meet at Boxted Airfield was called off.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: Have you met Mrs Kalyani?", () => {
      const text = "Have you met Mrs Kalyani?";
      const expected = "Have you met Mrs. Kalyani?";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: Prof Joyner of King's College, London.", () => {
      const text = "Prof Joyner of King's College, London.";
      const expected = "Prof. Joyner of King's College, London.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });

    test("Translate: Tea time is usually around 4 or 4.30.", () => {
      const text = "Tea time is usually around 4 or 4.30.";
      const expected = "Tea time is usually around 4 or 4:30.";
      assert.equal(
        removeHighLight(translator.britishToAmerican(text)),
        expected
      );
    });
  });

  suite("Highlight translation", () => {
    test("Mangoes are my favorite fruit.", () => {
      const text = "Mangoes are my favorite fruit.";
      assert.include(translator.americanToBritish(text), "highlight");
    });

    test("I ate yogurt for breakfast.", () => {
      const text = "I ate yogurt for breakfast.";
      assert.include(translator.americanToBritish(text), "highlight");
    });

    test("Mangoes are my favorite fruit.", () => {
      const text = "We watched the footie match for a while.";
      assert.include(translator.britishToAmerican(text), "highlight");
    });

    test("Paracetamol takes up to an hour to work.", () => {
      const text = "Paracetamol takes up to an hour to work.";
      assert.include(translator.britishToAmerican(text), "highlight");
    });
  });
});
