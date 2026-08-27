/**
 * Akinator Word Data — attribute-based word knowledge base for the English Akinator game.
 *
 * Design goals:
 * - Rich attribute set (40+ attributes) so questions feel varied and informative
 * - Multiple question phrasings per attribute — picked randomly each game
 * - Randomized question selection among top scoring candidates to prevent repetition
 */

import { allVocabWords, VocabWord } from "./startersVocabulary";

export interface WordAttributes {
  id: string; // matches VocabWord.id

  // ── Category ──────────────────────────────────────────────────────
  isAnimal: boolean;
  isFood: boolean;
  isDrink: boolean;
  isClothes: boolean;
  isBodyPart: boolean;
  isPerson: boolean;
  isFurniture: boolean;
  isRoom: boolean;
  isSchoolThing: boolean;
  isToy: boolean;

  // ── Life / Biology ────────────────────────────────────────────────
  isAlive: boolean;
  canFly: boolean;
  canSwim: boolean;
  livesInWater: boolean;
  liveIndoors: boolean;       // typically lives/found inside a home
  isPet: boolean;             // can be kept as a pet
  hasFur: boolean;
  hasTail: boolean;
  hasFourLegs: boolean;
  hasTwoLegs: boolean;
  makesSound: boolean;        // makes a distinct sound (animal calls, instrument)

  // ── Food properties ───────────────────────────────────────────────
  isFruit: boolean;
  isVegetable: boolean;
  isSweet: boolean;
  canEat: boolean;
  canDrink: boolean;
  cookedBeforeEating: boolean; // usually cooked (rice, egg, fish...)
  isHotFood: boolean;          // served hot
  isColdFood: boolean;         // served cold (ice cream, juice...)

  // ── Physical appearance ───────────────────────────────────────────
  isSmall: boolean;   // fits in one hand
  isLong: boolean;    // longer than it is wide (snake, pencil, banana...)
  isRound: boolean;   // roughly round / spherical
  isFlat: boolean;    // thin and flat
  isHard: boolean;    // rigid / hard material
  isSoft: boolean;    // soft to the touch
  isColorful: boolean; // typically has many colours
  isYellow: boolean;
  isRed: boolean;
  isGreen: boolean;
  isWhite: boolean;
  isBrown: boolean;

  // ── Clothing specifics ────────────────────────────────────────────
  isWorn: boolean;       // worn on body
  isWornOnHead: boolean;
  isWornOnFeet: boolean;
  isWornOnHands: boolean;
  coversUpperBody: boolean;
  coversLowerBody: boolean;

  // ── Use / Function ────────────────────────────────────────────────
  usedForWriting: boolean;
  usedForSitting: boolean;
  usedForSleeping: boolean;
  usedAtSchool: boolean;
  usedForCooking: boolean;
  usedForLooking: boolean; // e.g. mirror, glasses, telescope
  foundInKitchen: boolean;
  foundInBedroom: boolean;
  foundInBathroom: boolean;
  foundOutdoors: boolean;
  isMadeByHuman: boolean;  // manufactured / man-made
}

// ─────────────────────────────────────────────────────────────────────────────
// Shorthand factory — only the unusual fields need explicit values
// ─────────────────────────────────────────────────────────────────────────────
function word(id: string, overrides: Partial<Omit<WordAttributes, "id">>): WordAttributes {
  return {
    id,
    isAnimal: false, isFood: false, isDrink: false, isClothes: false, isBodyPart: false,
    isPerson: false, isFurniture: false, isRoom: false, isSchoolThing: false, isToy: false,
    isAlive: false, canFly: false, canSwim: false, livesInWater: false, liveIndoors: false,
    isPet: false, hasFur: false, hasTail: false, hasFourLegs: false, hasTwoLegs: false, makesSound: false,
    isFruit: false, isVegetable: false, isSweet: false, canEat: false, canDrink: false,
    cookedBeforeEating: false, isHotFood: false, isColdFood: false,
    isSmall: false, isLong: false, isRound: false, isFlat: false, isHard: false, isSoft: false,
    isColorful: false, isYellow: false, isRed: false, isGreen: false, isWhite: false, isBrown: false,
    isWorn: false, isWornOnHead: false, isWornOnFeet: false, isWornOnHands: false,
    coversUpperBody: false, coversLowerBody: false,
    usedForWriting: false, usedForSitting: false, usedForSleeping: false, usedAtSchool: false,
    usedForCooking: false, usedForLooking: false,
    foundInKitchen: false, foundInBedroom: false, foundInBathroom: false,
    foundOutdoors: false, isMadeByHuman: false,
    ...overrides,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WORD DATABASE
// ─────────────────────────────────────────────────────────────────────────────
export const wordAttributeList: WordAttributes[] = [

  // ── ANIMALS ──────────────────────────────────────────────────────────────────
  word("zoo-bird",      { isAnimal:true, isAlive:true, canFly:true, hasTwoLegs:true, hasTail:true, makesSound:true, isSmall:true, isColorful:true, foundOutdoors:true }),
  word("zoo-cat",       { isAnimal:true, isAlive:true, isPet:true, liveIndoors:true, hasFur:true, hasTail:true, hasFourLegs:true, isSmall:true, makesSound:true, isSoft:true }),
  word("zoo-cow",       { isAnimal:true, isAlive:true, hasFur:true, hasTail:true, hasFourLegs:true, makesSound:true, isWhite:true, foundOutdoors:true }),
  word("zoo-crocodile", { isAnimal:true, isAlive:true, canSwim:true, livesInWater:true, hasTail:true, hasFourLegs:true, isLong:true, isHard:true, isGreen:true, foundOutdoors:true }),
  word("zoo-dog",       { isAnimal:true, isAlive:true, isPet:true, liveIndoors:true, hasFur:true, hasTail:true, hasFourLegs:true, makesSound:true, isSoft:true, foundOutdoors:true }),
  word("zoo-duck",      { isAnimal:true, isAlive:true, canFly:true, canSwim:true, livesInWater:true, hasTail:true, hasTwoLegs:true, makesSound:true, isYellow:true, foundOutdoors:true }),
  word("zoo-elephant",  { isAnimal:true, isAlive:true, hasTail:true, hasFourLegs:true, makesSound:true, isLong:true, isBrown:true, foundOutdoors:true }),
  word("zoo-frog",      { isAnimal:true, isAlive:true, canSwim:true, livesInWater:true, hasFourLegs:true, makesSound:true, isSmall:true, isGreen:true, foundOutdoors:true }),
  word("zoo-giraffe",   { isAnimal:true, isAlive:true, hasFur:true, hasTail:true, hasFourLegs:true, isLong:true, isYellow:true, foundOutdoors:true }),
  word("zoo-hippo",     { isAnimal:true, isAlive:true, canSwim:true, livesInWater:true, hasTail:true, hasFourLegs:true, makesSound:true, foundOutdoors:true }),
  word("zoo-horse",     { isAnimal:true, isAlive:true, hasFur:true, hasTail:true, hasFourLegs:true, makesSound:true, isBrown:true, foundOutdoors:true }),
  word("zoo-lizard",    { isAnimal:true, isAlive:true, hasTail:true, hasFourLegs:true, isSmall:true, isGreen:true, foundOutdoors:true }),
  word("zoo-monkey",    { isAnimal:true, isAlive:true, hasFur:true, hasTail:true, hasTwoLegs:true, makesSound:true, isColorful:true, foundOutdoors:true }),
  word("zoo-mouse",     { isAnimal:true, isAlive:true, isPet:true, liveIndoors:true, hasFur:true, hasTail:true, hasFourLegs:true, makesSound:true, isSmall:true }),
  word("zoo-sheep",     { isAnimal:true, isAlive:true, hasFur:true, hasTail:true, hasFourLegs:true, makesSound:true, isWhite:true, isSoft:true, foundOutdoors:true }),
  word("zoo-snake",     { isAnimal:true, isAlive:true, canSwim:true, isLong:true, isGreen:true, foundOutdoors:true }),
  word("zoo-spider",    { isAnimal:true, isAlive:true, isSmall:true, foundOutdoors:true }),
  word("zoo-tiger",     { isAnimal:true, isAlive:true, hasFur:true, hasTail:true, hasFourLegs:true, makesSound:true, isYellow:true, foundOutdoors:true }),
  word("zoo-chicken",   { isAnimal:true, isAlive:true, canFly:true, hasTwoLegs:true, hasTail:true, makesSound:true, isWhite:true, foundOutdoors:true }),

  // ── FOOD ─────────────────────────────────────────────────────────────────────
  word("food-apple",      { isFood:true, isFruit:true, isSweet:true, canEat:true, isSmall:true, isRound:true, isRed:true, isGreen:true, isMadeByHuman:false, foundInKitchen:true }),
  word("food-banana",     { isFood:true, isFruit:true, isSweet:true, canEat:true, isSmall:true, isLong:true, isYellow:true, isSoft:true, foundInKitchen:true }),
  word("food-bread",      { isFood:true, isSweet:false, canEat:true, isSmall:true, isSoft:true, isMadeByHuman:true, cookedBeforeEating:true, isHotFood:true, isYellow:true, isBrown:true, foundInKitchen:true }),
  word("food-burger",     { isFood:true, canEat:true, isSmall:true, isRound:true, isSoft:true, isMadeByHuman:true, cookedBeforeEating:true, isHotFood:true, foundInKitchen:false }),
  word("food-cake",       { isFood:true, isSweet:true, canEat:true, isSoft:true, isMadeByHuman:true, cookedBeforeEating:true, isColorful:true }),
  word("food-candy",      { isFood:true, isSweet:true, canEat:true, isSmall:true, isRound:true, isColorful:true, isMadeByHuman:true, isColdFood:false }),
  word("food-carrot",     { isFood:true, isVegetable:true, canEat:true, isSmall:true, isLong:true, isRed:false, isGreen:false, foundInKitchen:true }),
  word("food-chocolate",  { isFood:true, isSweet:true, canEat:true, isSmall:true, isFlat:true, isHard:true, isMadeByHuman:true, isBrown:true }),
  word("food-coconut",    { isFood:true, isFruit:true, canEat:true, canDrink:true, isRound:true, isHard:true, isWhite:true, isBrown:true, foundOutdoors:true }),
  word("food-egg",        { isFood:true, canEat:true, isSmall:true, isRound:true, isWhite:true, cookedBeforeEating:true, foundInKitchen:true }),
  word("food-fish",       { isFood:true, canEat:true, canSwim:true, livesInWater:true, cookedBeforeEating:true, isHotFood:true, foundInKitchen:true }),
  word("food-fries",      { isFood:true, canEat:true, isLong:true, isYellow:true, cookedBeforeEating:true, isHotFood:true, isMadeByHuman:true }),
  word("food-grapes",     { isFood:true, isFruit:true, isSweet:true, canEat:true, isSmall:true, isRound:true, isRed:true, isGreen:true, foundInKitchen:true }),
  word("food-icecream",   { isFood:true, isSweet:true, canEat:true, isSmall:true, isMadeByHuman:true, isColdFood:true, isColorful:true }),
  word("food-lemon",      { isFood:true, isFruit:true, canEat:true, isSmall:true, isRound:true, isYellow:true, foundInKitchen:true }),
  word("food-mango",      { isFood:true, isFruit:true, isSweet:true, canEat:true, isSmall:true, isRound:true, isYellow:true, foundInKitchen:true }),
  word("food-meat",       { isFood:true, canEat:true, cookedBeforeEating:true, isHotFood:true, isRed:true, isBrown:true, foundInKitchen:true }),
  word("food-orange",     { isFood:true, isFruit:true, isSweet:true, canEat:true, isSmall:true, isRound:true, foundInKitchen:true }),
  word("food-pear",       { isFood:true, isFruit:true, isSweet:true, canEat:true, isSmall:true, isGreen:true, foundInKitchen:true }),
  word("food-pineapple",  { isFood:true, isFruit:true, isSweet:true, canEat:true, isYellow:true, isGreen:true, foundOutdoors:true }),
  word("food-potato",     { isFood:true, isVegetable:true, canEat:true, isSmall:true, isRound:true, cookedBeforeEating:true, foundInKitchen:true }),
  word("food-rice",       { isFood:true, canEat:true, isSmall:true, isWhite:true, cookedBeforeEating:true, isHotFood:true, foundInKitchen:true }),
  word("food-sausage",    { isFood:true, canEat:true, isLong:true, isRed:true, isBrown:true, cookedBeforeEating:true, isMadeByHuman:true }),
  word("food-tomato",     { isFood:true, isVegetable:true, canEat:true, isSmall:true, isRound:true, isRed:true, foundInKitchen:true }),
  word("food-watermelon", { isFood:true, isFruit:true, isSweet:true, canEat:true, isRound:true, isGreen:true, isRed:true, foundInKitchen:true }),

  // ── DRINKS ───────────────────────────────────────────────────────────────────
  word("food-juice",      { isDrink:true, isSweet:true, canDrink:true, isColorful:true, isColdFood:true, isMadeByHuman:true, foundInKitchen:true }),
  word("food-milk",       { isDrink:true, canDrink:true, isWhite:true, isColdFood:true, foundInKitchen:true }),
  word("food-lemonade",   { isDrink:true, isSweet:true, canDrink:true, isColdFood:true, isYellow:true, isMadeByHuman:true }),
  word("food-water",      { isDrink:true, canDrink:true, isColdFood:true, foundInKitchen:true }),

  // ── CLOTHES ──────────────────────────────────────────────────────────────────
  word("clothes-bag",      { isClothes:true, isWorn:true, isSmall:true, isMadeByHuman:true, usedAtSchool:true }),
  word("clothes-dress",    { isClothes:true, isWorn:true, coversUpperBody:true, coversLowerBody:true, isMadeByHuman:true, isColorful:true }),
  word("clothes-glasses",  { isClothes:true, isWorn:true, usedForLooking:true, isHard:true, isMadeByHuman:true }),
  word("clothes-hat",      { isClothes:true, isWorn:true, isWornOnHead:true, isRound:true, isMadeByHuman:true }),
  word("clothes-jacket",   { isClothes:true, isWorn:true, coversUpperBody:true, isSoft:true, isMadeByHuman:true }),
  word("clothes-jeans",    { isClothes:true, isWorn:true, coversLowerBody:true, isHard:true, isMadeByHuman:true }),
  word("clothes-shirt",    { isClothes:true, isWorn:true, coversUpperBody:true, isFlat:true, isMadeByHuman:true }),
  word("clothes-shoe",     { isClothes:true, isWorn:true, isWornOnFeet:true, isHard:true, isMadeByHuman:true, isSmall:true }),
  word("clothes-skirt",    { isClothes:true, isWorn:true, coversLowerBody:true, isFlat:true, isMadeByHuman:true }),
  word("clothes-sock",     { isClothes:true, isWorn:true, isWornOnFeet:true, isSoft:true, isMadeByHuman:true, isSmall:true }),
  word("clothes-tshirt",   { isClothes:true, isWorn:true, coversUpperBody:true, isFlat:true, isSoft:true, isMadeByHuman:true }),
  word("clothes-trousers", { isClothes:true, isWorn:true, coversLowerBody:true, isMadeByHuman:true }),
  word("clothes-watch",    { isClothes:true, isWorn:true, isWornOnHands:true, isRound:true, isHard:true, isMadeByHuman:true }),

  // ── BODY PARTS ───────────────────────────────────────────────────────────────
  word("body-head",   { isBodyPart:true, isRound:true }),
  word("body-hair",   { isBodyPart:true, isLong:true, isSoft:true, isColorful:true }),
  word("body-face",   { isBodyPart:true, isRound:true }),
  word("body-eye",    { isBodyPart:true, isSmall:true, isRound:true }),
  word("body-ear",    { isBodyPart:true, isSmall:true }),
  word("body-nose",   { isBodyPart:true, isSmall:true }),
  word("body-mouth",  { isBodyPart:true, isSmall:true, isRed:true }),
  word("body-arm",    { isBodyPart:true, isLong:true }),
  word("body-hand",   { isBodyPart:true, isSmall:true, isFlat:true }),
  word("body-leg",    { isBodyPart:true, isLong:true }),
  word("body-foot",   { isBodyPart:true, isSmall:true }),

  // ── HOME / FURNITURE ─────────────────────────────────────────────────────────
  word("home-armchair",  { isFurniture:true, usedForSitting:true, isMadeByHuman:true, isSoft:true }),
  word("home-bath",      { isFurniture:true, foundInBathroom:true, isMadeByHuman:true, isHard:true, isWhite:true }),
  word("home-bed",       { isFurniture:true, usedForSleeping:true, isMadeByHuman:true, isSoft:true, foundInBedroom:true }),
  word("home-bookcase",  { isFurniture:true, usedAtSchool:false, isMadeByHuman:true, isHard:true }),
  word("home-chair",     { isFurniture:true, usedForSitting:true, usedAtSchool:true, isMadeByHuman:true, isHard:true, hasFourLegs:true }),
  word("home-clock",     { isFurniture:true, isRound:true, isMadeByHuman:true, isHard:true }),
  word("home-cupboard",  { isFurniture:true, isMadeByHuman:true, isHard:true, foundInKitchen:true }),
  word("home-door",      { isFurniture:true, isFlat:true, isHard:true, isMadeByHuman:true, isBrown:true }),
  word("home-flower",    { isAlive:true, isColorful:true, isSmall:true, foundOutdoors:true, isSoft:true }),
  word("home-lamp",      { isFurniture:true, isMadeByHuman:true, isHard:true }),
  word("home-mirror",    { isFurniture:true, isFlat:true, usedForLooking:true, isMadeByHuman:true, isHard:true, foundInBathroom:true }),
  word("home-phone",     { isFurniture:true, isSmall:true, isFlat:true, isHard:true, isMadeByHuman:true }),
  word("home-radio",     { isFurniture:true, isMadeByHuman:true, isHard:true, makesSound:true }),
  word("home-sofa",      { isFurniture:true, usedForSitting:true, isMadeByHuman:true, isSoft:true }),
  word("home-table",     { isFurniture:true, usedAtSchool:true, isMadeByHuman:true, isHard:true, hasFourLegs:true, foundInKitchen:true, usedForCooking:false }),
  word("home-television",{ isFurniture:true, isFlat:true, isHard:true, isMadeByHuman:true, makesSound:true, isColorful:true }),
  word("home-window",    { isFurniture:true, isFlat:true, isHard:true, isMadeByHuman:true, usedForLooking:true }),

  // ── ROOMS ────────────────────────────────────────────────────────────────────
  word("home-bathroom",  { isRoom:true, foundInBathroom:true }),
  word("home-bedroom",   { isRoom:true, foundInBedroom:true }),
  word("home-kitchen",   { isRoom:true, foundInKitchen:true, usedForCooking:true }),
  word("home-living-room",{ isRoom:true }),
  word("home-garden",    { isRoom:true, foundOutdoors:true, isGreen:true }),

  // ── SCHOOL ITEMS ─────────────────────────────────────────────────────────────
  word("school-book",    { isSchoolThing:true, usedAtSchool:true, isFlat:true, isHard:true, isMadeByHuman:true, isColorful:true }),
  word("school-board",   { isSchoolThing:true, usedAtSchool:true, isFlat:true, isHard:true, isMadeByHuman:true, isGreen:true, isBrown:true }),
  word("school-computer",{ isSchoolThing:true, usedAtSchool:true, isFlat:true, isHard:true, isMadeByHuman:true }),
  word("school-desk",    { isSchoolThing:true, usedAtSchool:true, usedForSitting:false, isHard:true, isMadeByHuman:true, hasFourLegs:true }),
  word("school-eraser",  { isSchoolThing:true, usedAtSchool:true, usedForWriting:true, isSmall:true, isSoft:true, isWhite:true, isMadeByHuman:true }),
  word("school-pen",     { isSchoolThing:true, usedAtSchool:true, usedForWriting:true, isSmall:true, isLong:true, isMadeByHuman:true }),
  word("school-pencil",  { isSchoolThing:true, usedAtSchool:true, usedForWriting:true, isSmall:true, isLong:true, isYellow:true, isMadeByHuman:true }),
  word("school-ruler",   { isSchoolThing:true, usedAtSchool:true, usedForWriting:true, isSmall:true, isLong:true, isFlat:true, isHard:true, isMadeByHuman:true }),
  word("school-teacher", { isPerson:true, usedAtSchool:true, isAlive:true }),

  // ── FAMILY / PEOPLE ──────────────────────────────────────────────────────────
  word("family-baby",    { isPerson:true, isAlive:true, isSmall:true }),
  word("family-boy",     { isPerson:true, isAlive:true, isSmall:true }),
  word("family-dad",     { isPerson:true, isAlive:true }),
  word("family-girl",    { isPerson:true, isAlive:true, isSmall:true }),
  word("family-grandma", { isPerson:true, isAlive:true }),
  word("family-grandpa", { isPerson:true, isAlive:true }),
  word("family-mum",     { isPerson:true, isAlive:true }),
  word("family-robot",   { isPerson:false, isToy:true, isHard:true, isMadeByHuman:true, makesSound:true }),
  word("family-toy",     { isToy:true, isSmall:true, isMadeByHuman:true, isColorful:true }),
  word("family-balloon", { isToy:true, isRound:true, isColorful:true, isSmall:true, isMadeByHuman:true }),
  word("family-doll",    { isToy:true, isSmall:true, isMadeByHuman:true, isColorful:true }),

  // ── BEACH / OUTDOOR ──────────────────────────────────────────────────────────
  word("ta3-sun",      { isAlive:false, foundOutdoors:true, isRound:true, isYellow:true, isHard:false }),
  word("ta3-sea",      { foundOutdoors:true, livesInWater:true, isColorful:false }),
  word("ta3-sand",     { foundOutdoors:true, isSmall:true, isYellow:true }),
  word("ta3-boat",     { isMadeByHuman:true, canSwim:true, livesInWater:true, isHard:true }),
  word("ta3-umbrella", { isMadeByHuman:true, isRound:true, isColorful:true, isWorn:false, foundOutdoors:true }),
  word("ta3-ball",     { isToy:true, isRound:true, isSmall:true, isMadeByHuman:true, isColorful:true }),
];

// ─────────────────────────────────────────────────────────────────────────────
// ATTRIBUTE KEYS
// ─────────────────────────────────────────────────────────────────────────────
export type AttributeKey = keyof Omit<WordAttributes, "id">;

export const ALL_ATTRIBUTE_KEYS: AttributeKey[] = [
  "isAnimal","isFood","isDrink","isClothes","isBodyPart","isPerson","isFurniture","isRoom","isSchoolThing","isToy",
  "isAlive","canFly","canSwim","livesInWater","liveIndoors","isPet","hasFur","hasTail","hasFourLegs","hasTwoLegs","makesSound",
  "isFruit","isVegetable","isSweet","canEat","canDrink","cookedBeforeEating","isHotFood","isColdFood",
  "isSmall","isLong","isRound","isFlat","isHard","isSoft","isColorful",
  "isYellow","isRed","isGreen","isWhite","isBrown",
  "isWorn","isWornOnHead","isWornOnFeet","isWornOnHands","coversUpperBody","coversLowerBody",
  "usedForWriting","usedForSitting","usedForSleeping","usedAtSchool","usedForCooking","usedForLooking",
  "foundInKitchen","foundInBedroom","foundInBathroom","foundOutdoors","isMadeByHuman",
];

// ─────────────────────────────────────────────────────────────────────────────
// MULTIPLE QUESTION PHRASINGS — picked randomly each game session
// ─────────────────────────────────────────────────────────────────────────────
export const ATTRIBUTE_QUESTION_VARIANTS: Record<AttributeKey, string[]> = {
  isAnimal:       ["Is it an animal? 🐾", "Is it a living creature or animal? 🦁", "Can you find it in a zoo or farm? 🐄"],
  isFood:         ["Is it a type of food? 🍽️", "Can you eat it as a meal or snack? 🥘", "Is it something people eat? 😋"],
  isDrink:        ["Is it a drink? 🥤", "Can you pour it into a glass? 🍶", "Is it a liquid you drink? 💧"],
  isClothes:      ["Is it an item of clothing? 👕", "Is it something you wear? 🧥", "Does it belong in a wardrobe? 👗"],
  isBodyPart:     ["Is it a part of the body? 🫀", "Can you find it on a person's body? 👤", "Is it part of our human body? 💪"],
  isPerson:       ["Is it a person? 👤", "Is it a human being? 🧑", "Is it someone you know in a family? 👨‍👩‍👧"],
  isFurniture:    ["Is it furniture or an object inside a home? 🏠", "Can you find it inside a house? 🛋️", "Is it a household object? 🪑"],
  isRoom:         ["Is it a room in a house? 🚪", "Is it a place inside a building? 🏠", "Is it a type of room? 🛏"],
  isSchoolThing:  ["Is it something you find at school? 🏫", "Is it used in a classroom? 📚", "Do students use it every day? ✏️"],
  isToy:          ["Is it a toy? 🪆", "Do children play with it? 🎮", "Is it used for playing? 🎈"],
  isAlive:        ["Is it alive? 🌱", "Is it a living thing — like a plant or animal? 🌿", "Can it grow and breathe? 🍃"],
  canFly:         ["Can it fly? ✈️", "Does it go up in the sky? 🌤️", "Can it move through the air? 🕊️"],
  canSwim:        ["Can it swim? 🏊", "Does it move through water? 🐟", "Can it go under water? 🌊"],
  livesInWater:   ["Does it live in or near water? 💧", "Is it found in a river, lake or sea? 🌊", "Does it need water to survive? 🐠"],
  liveIndoors:    ["Does it usually live inside a home? 🏠", "Is it an indoor animal or object? 🐈", "Does it stay inside the house? 🏡"],
  isPet:          ["Can it be kept as a pet? 🐕", "Is it an animal people keep at home? 🐈", "Do people have it as a family pet? 🐾"],
  hasFur:         ["Does it have fur or feathers? 🦊", "Is it furry or fluffy? 🐑", "Does it have a coat of fur? 🐻"],
  hasTail:        ["Does it have a tail? 🦓", "Can you see a tail on it? 🐒", "Does it wag or use a tail? 🐈"],
  hasFourLegs:    ["Does it have four legs? 🐾", "Does it walk on four legs? 🦎", "Is it a four-legged animal? 🐄"],
  hasTwoLegs:     ["Does it have two legs? 🦵", "Does it walk or stand on two legs? 🐧", "Is it two-legged? 👣"],
  makesSound:     ["Does it make a sound or noise? 🔊", "Can you hear it from far away? 📢", "Does it make a special sound? 🎵"],
  isFruit:        ["Is it a fruit? 🍊", "Does it grow on a tree as a fruit? 🍏", "Is it a sweet fruit? 🍓"],
  isVegetable:    ["Is it a vegetable? 🥦", "Does it grow in the ground as a vegetable? 🥕", "Is it eaten as a vegetable? 🧅"],
  isSweet:        ["Is it sweet? 🍬", "Does it have a sweet taste? 🍯", "Is it sugary or sweet-tasting? 🍭"],
  canEat:         ["Can you eat it? 😋", "Is it something people put in their mouth to eat? 🍴", "Do you chew or eat it? 🥢"],
  canDrink:       ["Can you drink it? 💧", "Is it a liquid you sip or drink? 🥤", "Do people drink it in a glass or cup? ☕"],
  cookedBeforeEating: ["Does it need to be cooked before eating? 🍳", "Do you heat it up before you eat it? 🔥", "Is it usually cooked first? 🫕"],
  isHotFood:      ["Is it usually served hot? ♨️", "Do you eat it while it's warm? 🌡️", "Is it a hot dish or meal? 🍲"],
  isColdFood:     ["Is it usually served cold? ❄️", "Do you eat or drink it when it's cold? 🧊", "Is it a cold snack or drink? 🍦"],
  isSmall:        ["Is it small enough to hold in one hand? ✋", "Can you easily carry it in your pocket? 👌", "Is it a small, little object? 🐭"],
  isLong:         ["Is it long or tall? 📏", "Is it much longer than it is wide? 🐍", "Does it have a long shape? 🌴"],
  isRound:        ["Is it round or circular? ⭕", "Does it have a round or ball-like shape? 🔵", "Is its shape mostly round? 🌕"],
  isFlat:         ["Is it flat and thin? 📄", "Is it much thinner than it is wide? 🥞", "Does it have a flat shape? 🃏"],
  isHard:         ["Is it hard or rigid? 🪨", "Is it solid and hard to bend? 🏗️", "Does it feel hard when you touch it? ⛏️"],
  isSoft:         ["Is it soft to touch? 🧸", "Does it feel soft or squishy? ☁️", "Is it gentle and soft? 🐑"],
  isColorful:     ["Is it usually very colourful? 🌈", "Does it come in many bright colours? 🎨", "Is it full of different colours? 🦜"],
  isYellow:       ["Is it yellow? 🟡", "Does it have a yellow colour? 🌟", "Is it the colour yellow? 🍋"],
  isRed:          ["Is it red? 🔴", "Does it have a red colour? 🍎", "Is it the colour red? ❤️"],
  isGreen:        ["Is it green? 🟢", "Does it have a green colour? 🍀", "Is it the colour green? 🌿"],
  isWhite:        ["Is it white? ⬜", "Does it have a white colour? 🤍", "Is it the colour white? 🥛"],
  isBrown:        ["Is it brown? 🟤", "Does it have a brown colour? 🍂", "Is it the colour brown? 🪵"],
  isWorn:         ["Do you wear it on your body? 🧤", "Is it something you put on your body? 👒", "Is it a wearable item? 👠"],
  isWornOnHead:   ["Do you wear it on your head? 🎩", "Is it something on top of your head? 👑", "Does it sit on your head? ⛑️"],
  isWornOnFeet:   ["Do you wear it on your feet? 👟", "Is it worn on the feet or legs? 🧦", "Does it go on your feet? 👣"],
  isWornOnHands:  ["Do you wear it on your wrist or hand? ⌚", "Is it something worn on the hand? 🧤", "Does it go on your wrist? 📿"],
  coversUpperBody:["Does it cover the upper body (chest/arms)? 👕", "Is it a top you wear on your chest? 🫶", "Does it go on your upper body? 🧥"],
  coversLowerBody:["Does it cover the lower body (waist/legs)? 👖", "Is it worn below the waist? 🩱", "Does it cover your legs? 👗"],
  usedForWriting: ["Is it used for writing? ✏️", "Can you write with it? 🖊️", "Do you use it to put marks on paper? 📝"],
  usedForSitting: ["Do people sit on it? 🪑", "Is it something you sit on? 🛋️", "Can you sit down on it? 🧘"],
  usedForSleeping:["Do people sleep on it or in it? 🛏️", "Is it used for sleeping? 😴", "Is it where you go to sleep? 🌙"],
  usedAtSchool:   ["Is it found or used at school? 🏫", "Do students use it every day? 📚", "Is it a school item? 🖇️"],
  usedForCooking: ["Is it used for cooking? 🍳", "Do people cook food in it or on it? 👨‍🍳", "Is it a cooking item? 🫕"],
  usedForLooking: ["Is it used for seeing or looking? 👀", "Do people look through it or at it? 🔭", "Is it used for looking at things? 🪞"],
  foundInKitchen: ["Can you find it in a kitchen? 🍳", "Is it usually in the kitchen? 🥘", "Is it a kitchen item? 🍴"],
  foundInBedroom: ["Is it usually found in a bedroom? 🛏️", "Can you find it in a bedroom? 🌙", "Is it a bedroom item? 😴"],
  foundInBathroom:["Is it usually found in a bathroom? 🚿", "Can you find it in a bathroom? 🛁", "Is it a bathroom item? 🪥"],
  foundOutdoors:  ["Is it usually found outside? 🌳", "Is it an outdoor thing? ☀️", "Do you see it outdoors in nature? 🌿"],
  isMadeByHuman:  ["Is it man-made or manufactured? 🏭", "Did people make or build it? 🔧", "Was it made in a factory? 📦"],
};

// Vietnamese hint shown beneath each question
export const ATTRIBUTE_HINTS: Record<AttributeKey, string> = {
  isAnimal:        "Nó có phải là động vật không?",
  isFood:          "Nó có phải là thức ăn không?",
  isDrink:         "Nó có phải là đồ uống không?",
  isClothes:       "Nó có phải là quần áo/phụ kiện không?",
  isBodyPart:      "Nó có phải là bộ phận cơ thể không?",
  isPerson:        "Nó có phải là một người không?",
  isFurniture:     "Nó có phải là đồ vật trong nhà không?",
  isRoom:          "Nó có phải là một căn phòng không?",
  isSchoolThing:   "Nó có ở trong trường học không?",
  isToy:           "Nó có phải là đồ chơi không?",
  isAlive:         "Nó có phải là vật sống không?",
  canFly:          "Nó có thể bay không?",
  canSwim:         "Nó có thể bơi không?",
  livesInWater:    "Nó sống trong nước không?",
  liveIndoors:     "Nó thường ở trong nhà không?",
  isPet:           "Nó có thể nuôi làm thú cưng không?",
  hasFur:          "Nó có lông không?",
  hasTail:         "Nó có đuôi không?",
  hasFourLegs:     "Nó có bốn chân không?",
  hasTwoLegs:      "Nó có hai chân không?",
  makesSound:      "Nó có phát ra âm thanh không?",
  isFruit:         "Nó có phải là trái cây không?",
  isVegetable:     "Nó có phải là rau/củ không?",
  isSweet:         "Nó có vị ngọt không?",
  canEat:          "Có thể ăn nó không?",
  canDrink:        "Có thể uống nó không?",
  cookedBeforeEating: "Nó cần nấu chín trước khi ăn không?",
  isHotFood:       "Nó thường được ăn khi nóng không?",
  isColdFood:      "Nó thường được ăn/uống khi lạnh không?",
  isSmall:         "Nó có đủ nhỏ để cầm trên tay không?",
  isLong:          "Nó có dài không?",
  isRound:         "Nó có hình tròn không?",
  isFlat:          "Nó có phẳng và mỏng không?",
  isHard:          "Nó có cứng không?",
  isSoft:          "Nó có mềm không?",
  isColorful:      "Nó có nhiều màu sắc không?",
  isYellow:        "Nó có màu vàng không?",
  isRed:           "Nó có màu đỏ không?",
  isGreen:         "Nó có màu xanh lá không?",
  isWhite:         "Nó có màu trắng không?",
  isBrown:         "Nó có màu nâu không?",
  isWorn:          "Em có mặc/đeo nó không?",
  isWornOnHead:    "Nó được đội trên đầu không?",
  isWornOnFeet:    "Nó được mang ở chân không?",
  isWornOnHands:   "Nó được đeo ở tay/cổ tay không?",
  coversUpperBody: "Nó che phần trên cơ thể không?",
  coversLowerBody: "Nó che phần dưới cơ thể không?",
  usedForWriting:  "Nó được dùng để viết không?",
  usedForSitting:  "Người ta ngồi lên nó không?",
  usedForSleeping: "Người ta ngủ trên nó không?",
  usedAtSchool:    "Nó được dùng ở trường không?",
  usedForCooking:  "Nó được dùng để nấu ăn không?",
  usedForLooking:  "Nó được dùng để nhìn/soi không?",
  foundInKitchen:  "Em tìm thấy nó trong bếp không?",
  foundInBedroom:  "Em tìm thấy nó trong phòng ngủ không?",
  foundInBathroom: "Em tìm thấy nó trong phòng tắm không?",
  foundOutdoors:   "Em thường thấy nó ngoài trời không?",
  isMadeByHuman:   "Nó có do con người tạo ra không?",
};

// ─────────────────────────────────────────────────────────────────────────────
// WORD LOOKUP HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const vocabMap = new Map<string, VocabWord>(
  allVocabWords.map((w) => [w.id, w])
);

export function getVocabWord(id: string): VocabWord | undefined {
  return vocabMap.get(id);
}

export const PLAYABLE_WORD_IDS = new Set(wordAttributeList.map((w) => w.id));

export function getWordAttrs(id: string): WordAttributes | undefined {
  return wordAttributeList.find((w) => w.id === id);
}

// ─────────────────────────────────────────────────────────────────────────────
// RANDOMIZED INFORMATION-GAIN ALGORITHM
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Pick the next question attribute.
 *
 * Strategy (prevents rigid repetition):
 * 1. Score each attribute by |trueCount - falseCount| (lower = better split)
 * 2. Collect all attributes within `RANDOMNESS_WINDOW` of the best score
 * 3. Pick ONE at RANDOM from that pool → different path every game
 *
 * RANDOMNESS_WINDOW: how much worse than the best score we still consider.
 * With n=60 words, a window of 8 typically gives 5-12 near-equal candidates.
 */
const RANDOMNESS_WINDOW = 10;

export function pickBestQuestion(
  candidates: WordAttributes[],
  asked: Set<AttributeKey>
): AttributeKey | null {
  const n = candidates.length;
  if (n === 0) return null;

  // Score every unused attribute
  const scored: { key: AttributeKey; score: number }[] = [];

  for (const key of ALL_ATTRIBUTE_KEYS) {
    if (asked.has(key)) continue;
    const trueCount = candidates.filter((w) => w[key]).length;
    const falseCount = n - trueCount;
    if (trueCount === 0 || falseCount === 0) continue; // no discriminating power
    scored.push({ key, score: Math.abs(trueCount - falseCount) });
  }

  if (scored.length === 0) return null;

  // Sort by score ascending (best split first)
  scored.sort((a, b) => a.score - b.score);
  const bestScore = scored[0].score;

  // Collect candidates within the randomness window
  const pool = scored.filter((s) => s.score <= bestScore + RANDOMNESS_WINDOW);

  // Pick randomly from pool
  return pool[Math.floor(Math.random() * pool.length)].key;
}

/**
 * Filter candidates based on a Yes/No/Maybe answer.
 */
export function filterCandidates(
  candidates: WordAttributes[],
  key: AttributeKey,
  answer: "yes" | "no" | "maybe"
): WordAttributes[] {
  if (answer === "maybe") return candidates;
  return candidates.filter((w) => (answer === "yes" ? w[key] : !w[key]));
}

/**
 * Pick a random phrasing for an attribute key.
 * Call once per question so it's stable during one turn.
 */
export function pickQuestionPhrasing(key: AttributeKey): string {
  const variants = ATTRIBUTE_QUESTION_VARIANTS[key];
  return variants[Math.floor(Math.random() * variants.length)];
}
