export interface ProductVariant {
  label: string;
  price: number;
  shopifyVariantId?: string;
  image?: string;
  inStock?: boolean;
  quantityAvailable?: number;
  compareAtPrice?: number;
}

export function getProductById(id: string): ProductDetailsType | undefined {
  return productsList.find((p) => p.id === id);
}

export interface ProductMediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface ProductDetailsType {
  id: string;
  name: string;
  category: 'Teas' | 'Snacks' | 'Rituals' | 'Skincare' | 'Drinkware' | 'Reading' | 'Gifting';
  price: number;
  originalPrice: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  tag?: string;
  videoUrls?: string[];
  shortsUrls?: string[];
  media?: ProductMediaItem[];
  rating: number;
  reviews: number;
  description: string[];
  descriptionHtml?: string;
  benefits?: string[];
  ingredients?: string;
  howToUse?: string[];
  variants?: ProductVariant[];
  shopifyVariantId?: string;
  descriptionImages?: string[];
  isPrepaidOnly?: boolean;
}

export const productsList: ProductDetailsType[] = [
  {
    id: 'her-balance',
    name: 'Her Balance – Women’s Wellness Herbal Blend',
    category: 'Teas',
    price: 799,
    originalPrice: 999,
    tag: 'Bestseller',
    image: '/leafandlore/her_balance.png',
    gallery: [
      '/leafandlore/her_balance.png',
      '/leafandlore/tea_collection_hero.png',
      '/leafandlore/midnight_petal.png'
    ],
    rating: 4.9,
    reviews: 342,
    description: [
      'For the woman who pours into everyone else, this is your moment to pour back into yourself.',
      'A gentle ritual for harmony, nourishment, and everyday balance. Crafted with a thoughtful blend of 17 botanicals, Her Balance is designed to support women’s wellbeing through every season of life.',
      'Rooted in herbal traditions and the belief that true wellness begins with small, intentional rituals.'
    ],
    benefits: [
      'Supports hormonal balance & women\'s rhythm',
      'Naturally caffeine-free calming herbal ritual',
      'Nourishing adaptogens for sustained daily vitality',
      'Soothes mood swings and daily fatigue'
    ],
    ingredients: 'Chamomile, Nettle, Moringa, Amla, Shatavari, Fennel, Peppermint, Cinnamon, Ginger, Celery, Turmeric, Fenugreek, Cumin, Shankhpushpi, Punarnava, Manjistha, Cardamom.',
    howToUse: [
      'Place 1 tea bag or 1 tsp loose leaf in your favourite cup',
      'Pour freshly boiled water (95°C)',
      'Allow it to steep gently for 2–3 minutes',
      'Pause. Take a deep breath. Sip slowly.'
    ],
    variants: [
      { label: '50g Loose Leaf (25 Servings)', price: 799 },
      { label: 'Mini Trial Pack (10g)', price: 340 },
      { label: 'Pack of 2 (Wellness Duo)', price: 1499, compareAtPrice: 1998 }
    ]
  },
  {
    id: 'midnight-petal',
    name: 'Midnight Petal – Relaxation Botanical Blend',
    category: 'Teas',
    price: 320,
    originalPrice: 399,
    tag: 'Calming',
    image: '/leafandlore/midnight_petal.png',
    gallery: [
      '/leafandlore/midnight_petal.png',
      '/leafandlore/tea_collection_hero.png'
    ],
    rating: 4.9,
    reviews: 218,
    description: [
      'A delicate floral blend made for slow evenings and quiet moments.',
      'A soothing cup to help you unwind and settle into the night, releasing the mental busyness of the day.',
      'With Chamomile, Lavender, Lemon Balm, Passionflower, and Natural Herbs to help you unwind, relax, and find your inner calm.'
    ],
    benefits: [
      'A gentle night ritual for deeper, restful sleep',
      'Soft floral character that relaxes tired senses',
      '100% caffeine-free botanicals',
      'Encourages mindful evening unhurried living'
    ],
    ingredients: 'Chamomile, Lavender, Lemon Balm, Passionflower, Valerian Root, Rose Petals.',
    howToUse: [
      'Brew 1 tsp in hot water (90°C) 30 minutes before sleep',
      'Cover cup and steep for 4 minutes to trap essential botanical oils',
      'Uncover, inhale the floral lavender aroma, and enjoy warm.'
    ],
    variants: [
      { label: 'Mini Trial Pack (50g)', price: 320 },
      { label: 'Full Size Tin (100g)', price: 650 }
    ]
  },
  {
    id: 'daily-debloat',
    name: 'Daily Debloat – Cleansing Tea Ritual',
    category: 'Teas',
    price: 320,
    originalPrice: 399,
    tag: 'Digestive',
    image: '/leafandlore/daily_debloat.png',
    gallery: [
      '/leafandlore/daily_debloat.png',
      '/leafandlore/tea_collection_hero.png'
    ],
    rating: 4.8,
    reviews: 194,
    description: [
      'A refreshing blend crafted for your everyday wellness ritual, helping you feel lighter, fresher, and more comfortable after meals.',
      'Expertly balanced with Oolong Tea, Tulsi, Lemongrass, Ginger, and pure botanicals to support natural detox and renewal.'
    ],
    benefits: [
      'Supports gut lightness & digestive ease',
      'Reduces sluggish feeling after heavy meals',
      'Rich in cleansing antioxidants',
      'Crisp, refreshing herbal aroma'
    ],
    ingredients: 'Oolong Tea, Tulsi (Holy Basil), Lemongrass, Ginger, Fennel, Mint.',
    howToUse: [
      'Enjoy 1 cup 20–30 minutes after your lunch or dinner',
      'Steep in freshly boiled water for 3 minutes',
      'Can be savoured warm or lightly iced with a slice of lemon.'
    ],
    variants: [
      { label: 'Mini Trial Pack (50g)', price: 320 },
      { label: 'Full Size Pouch (120g)', price: 680 }
    ]
  },
  {
    id: 'lemon-balm-tea',
    name: 'Lemon Balm Tea – Gentle Herbal Infusion',
    category: 'Teas',
    price: 290,
    originalPrice: 350,
    tag: 'New Arrival',
    image: '/leafandlore/lemon_balm_tea.png',
    gallery: [
      '/leafandlore/lemon_balm_tea.png',
      '/leafandlore/tea_collection_hero.png'
    ],
    rating: 4.9,
    reviews: 86,
    description: [
      'Fresh, gentle, and soothing, lemon balm is a comforting herbal infusion for moments when you want to slow down.',
      'Naturally uplifting yet deeply grounding, bringing a citrusy herb bouquet to your mindful pause.'
    ],
    benefits: [
      'Nourishes nervous system and relieves daily tension',
      'Bright citrus-herbal aroma with zero caffeine',
      'Ideal companion for reading and meditation'
    ],
    ingredients: '100% Pure Shade-Dried Lemon Balm Leaves (Melissa officinalis).',
    howToUse: [
      'Steep 1–2 teaspoons in boiling water for 5 minutes',
      'Strain and sip mindfully.'
    ],
    variants: [
      { label: 'Standard Pouch (50g)', price: 290 },
      { label: 'Double Pack (100g)', price: 540 }
    ]
  },
  {
    id: 'jasmine-tea-flower',
    name: 'Jasmine Tea Flower – Fragrant & Calming Brew',
    category: 'Teas',
    price: 290,
    originalPrice: 350,
    tag: 'New Arrival',
    image: '/leafandlore/jasmine_tea.png',
    gallery: [
      '/leafandlore/jasmine_tea.png',
      '/leafandlore/tea_collection_hero.png'
    ],
    rating: 4.9,
    reviews: 112,
    description: [
      'Lightly floral and wonderfully fragrant, jasmine tea brings a delicate aroma and calming character to your cup.',
      'Hand-plucked whole jasmine blossoms infused with tender tea leaves for a soothing ritual.'
    ],
    benefits: [
      'Uplifting floral aromatherapy with every sip',
      'Rich in catechins and polyphenols',
      'Gentle mid-day mindfulness companion'
    ],
    ingredients: 'Whole Jasmine Blossoms, Premium Green Tea Leaves.',
    howToUse: [
      'Steep in water heated to 85°C for 2–3 minutes',
      'Inhale the steam before tasting.'
    ],
    variants: [
      { label: 'Blossom Pack (50g)', price: 290 }
    ]
  },
  {
    id: 'hibiscus-tea-flower',
    name: 'Hibiscus Tea Flower – Bright & Refreshing',
    category: 'Teas',
    price: 290,
    originalPrice: 350,
    tag: 'New Arrival',
    image: '/leafandlore/hibiscus_tea.png',
    gallery: [
      '/leafandlore/hibiscus_tea.png',
      '/leafandlore/tea_collection_hero.png'
    ],
    rating: 4.8,
    reviews: 145,
    description: [
      'Bright, tangy, and naturally refreshing, hibiscus makes a beautiful ruby-red cup for a little everyday pause.',
      'Packed with Vitamin C and revitalizing tart notes that nourish your body naturally.'
    ],
    benefits: [
      'High in natural Vitamin C and bioflavonoids',
      'Supports healthy blood circulation and hydration',
      'Delicious hot or as a cold brew with mint'
    ],
    ingredients: '100% Sun-Dried Hibiscus Sabdariffa Petals.',
    howToUse: [
      'Steep in hot water for 4–5 minutes for deep magenta hue',
      'Add raw honey if desired, or chill over ice.'
    ],
    variants: [
      { label: 'Petal Pouch (50g)', price: 290 },
      { label: 'Double Pack (100g)', price: 540 }
    ]
  },
  {
    id: 'masala-makhana',
    name: 'Masala Makhana – Roasted Savoury Crunch',
    category: 'Snacks',
    price: 180,
    originalPrice: 220,
    tag: 'Zero Palm Oil',
    image: '/leafandlore/masala_makhana.png',
    gallery: ['/leafandlore/masala_makhana.png'],
    rating: 4.9,
    reviews: 280,
    description: [
      'Crispy roasted foxnuts (makhana) coated in a delicious artisanal masala blend.',
      'A light, crunchy snack with the perfect savoury kick. Crafted with zero palm oil and no artificial flavours — just wholesome ingredients and delicious goodness.'
    ],
    benefits: [
      'Zero palm oil, roasted to airy perfection',
      'High protein, high fiber, gluten-free',
      'Mindful snacking without preservatives'
    ],
    ingredients: 'Roasted Foxnuts (Makhana), Cold-Pressed Oil, Indian Masala Spices, Pink Himalayan Salt.',
    variants: [
      { label: 'Single Jar (70g)', price: 180 },
      { label: 'Pack of 3 (Trio Pack)', price: 499, compareAtPrice: 540 }
    ]
  },
  {
    id: 'smoky-bbq-makhana',
    name: 'Smoky BBQ Makhana – Bold Gourmet Crunch',
    category: 'Snacks',
    price: 180,
    originalPrice: 220,
    tag: 'Zero Palm Oil',
    image: '/leafandlore/smoky_bbq_makhana.png',
    gallery: ['/leafandlore/smoky_bbq_makhana.png'],
    rating: 4.8,
    reviews: 167,
    description: [
      'Crunchy roasted makhana with a rich, smoky BBQ flavour.',
      'A satisfying snack for those who love bold, savoury notes without compromising on health. Zero palm oil.'
    ],
    benefits: [
      'Zero palm oil, roasted never fried',
      'Satisfies savoury cravings guilt-free',
      'Rich in calcium and magnesium'
    ],
    ingredients: 'Roasted Makhana, Natural Smoke Seasoning, Paprika, Brown Sugar, Rock Salt.',
    variants: [
      { label: 'Single Jar (70g)', price: 180 },
      { label: 'Pack of 3', price: 499 }
    ]
  },
  {
    id: 'pudina-makhana',
    name: 'Pudina Makhana – Mint Infused Crunch',
    category: 'Snacks',
    price: 180,
    originalPrice: 220,
    tag: 'Zero Palm Oil',
    image: '/leafandlore/pudina_makhana.png',
    gallery: ['/leafandlore/pudina_makhana.png'],
    rating: 4.9,
    reviews: 198,
    description: [
      'Light and crispy makhana with a refreshing minty twist.',
      'Fresh, flavourful, and perfect for everyday snacking between meetings or tea breaks.'
    ],
    benefits: [
      'Refreshing mint herbs and digestive spices',
      'Zero palm oil, roasted to light perfection',
      'Wholesome comfort snacking'
    ],
    ingredients: 'Roasted Makhana, Dried Mint Leaves, Cumin, Black Salt, Mango Powder.',
    variants: [
      { label: 'Single Jar (70g)', price: 180 },
      { label: 'Pack of 3', price: 499 }
    ]
  },
  {
    id: 'peri-peri-makhana',
    name: 'Peri Peri Makhana – Spicy Zesty Kick',
    category: 'Snacks',
    price: 180,
    originalPrice: 220,
    tag: 'Zero Palm Oil',
    image: '/leafandlore/peri_peri_makhana.png',
    gallery: ['/leafandlore/peri_peri_makhana.png'],
    rating: 4.9,
    reviews: 215,
    description: [
      'Roasted makhana with a bold peri peri seasoning.',
      'Crunchy, spicy, and full of flavour for when your cravings need an exciting kick.'
    ],
    benefits: [
      'Zesty chili and herb seasoning',
      'Zero palm oil, gluten free',
      'Low calorie crunch for active lifestyles'
    ],
    ingredients: 'Roasted Makhana, Bird’s Eye Chili, Garlic, Oregano, Lemon Zest, Sea Salt.',
    variants: [
      { label: 'Single Jar (70g)', price: 180 }
    ]
  },
  {
    id: 'masala-ragi-chips',
    name: 'Masala Ragi Chips – Wholesome Millet Crunch',
    category: 'Snacks',
    price: 160,
    originalPrice: 199,
    tag: 'Millet Magic',
    image: '/leafandlore/masala_ragi_chips.png',
    gallery: ['/leafandlore/masala_ragi_chips.png'],
    rating: 4.9,
    reviews: 230,
    description: [
      'Crispy ragi (finger millet) chips seasoned with a savoury masala blend.',
      'A deliciously crunchy way to add nutritious ancient grains to your snack time. Made with zero palm oil.'
    ],
    benefits: [
      'Ancient finger millet superfood grain',
      'High in dietary fiber and plant iron',
      'Crispy, satisfying snack with zero palm oil'
    ],
    ingredients: 'Ragi Flour, Rice Flour, Cold Pressed Oil, Desi Masala Seasoning, Salt.',
    variants: [
      { label: 'Single Jar (100g)', price: 160 },
      { label: 'Snack Duo (2 Jars)', price: 300 }
    ]
  },
  {
    id: 'cream-onion-ragi-chips',
    name: 'Cream & Onion Ragi Chips – Smooth & Crunchy',
    category: 'Snacks',
    price: 160,
    originalPrice: 199,
    tag: 'Millet Magic',
    image: '/leafandlore/cream_onion_ragi_chips.png',
    gallery: ['/leafandlore/cream_onion_ragi_chips.png'],
    rating: 4.8,
    reviews: 178,
    description: [
      'Crispy ragi chips with a smooth cream and onion flavour.',
      'Lightly savoury, wonderfully crunchy, and easy to reach for anytime of day.'
    ],
    benefits: [
      'Nutritious millet base with gourmet cream & chives taste',
      'Guilt-free alternative to potato chips',
      'Zero palm oil, no artificial flavor enhancers'
    ],
    ingredients: 'Ragi Flour, Corn Flour, Herbs, Onion Powder, Non-Dairy Cream Blend, Sea Salt.',
    variants: [
      { label: 'Single Jar (100g)', price: 160 }
    ]
  },
  {
    id: 'spice-ritual-duo',
    name: 'The Spice Ritual Duo – Turmeric Masala & Ginger Honey',
    category: 'Rituals',
    price: 650,
    originalPrice: 799,
    tag: 'Signature Duo',
    image: '/leafandlore/spice_ritual_combo.png',
    gallery: [
      '/leafandlore/spice_ritual_combo.png',
      '/leafandlore/turmeric_milk_masala.png',
      '/leafandlore/ginger_infused_honey.png'
    ],
    rating: 5.0,
    reviews: 310,
    description: [
      'A warm and comforting duo designed to bring natural goodness to your everyday rituals.',
      'With the earthy warmth of turmeric and aromatic spices paired with the gentle sweetness of raw honey and zing of ginger.',
      'Adds rich flavour, soothing warmth, and a nourishing touch to your daily routine.'
    ],
    benefits: [
      'Classic Ayurvedic golden immunity ritual',
      'Soothes throat, inflammation, and seasonal discomfort',
      'Beautiful vintage glass jars with artisan fabric ties'
    ],
    ingredients: 'Turmeric Milk Masala (150g) + Ginger Infused Raw Honey (55g).',
    howToUse: [
      'Heat 1 cup of warm milk (dairy or almond/oat)',
      'Whisk in 1/2 tsp of Turmeric Milk Masala',
      'Drizzle 1 tsp of Ginger Infused Honey',
      'Sip slowly before bed for deep comforting warmth.'
    ],
    variants: [
      { label: 'Full Duo Set (150g + 55g)', price: 650 }
    ]
  },
  {
    id: 'turmeric-milk-masala',
    name: 'Turmeric Milk Masala – Golden Immunity Blend (150g)',
    category: 'Rituals',
    price: 380,
    originalPrice: 450,
    tag: 'Earthy Warmth',
    image: '/leafandlore/turmeric_milk_masala.png',
    gallery: [
      '/leafandlore/turmeric_milk_masala.png',
      '/leafandlore/spice_ritual_combo.png'
    ],
    rating: 4.9,
    reviews: 142,
    description: [
      'A traditional blend of aromatic spices to warm your senses, boost immunity, and nurture overall wellness.',
      'High-curcumin turmeric combined with black pepper, green cardamom, cinnamon, and dry ginger.'
    ],
    benefits: [
      'Boosts cellular vitality and immune defense',
      'Black pepper enhances curcumin absorption by 2000%',
      'Warm comforting nightcap'
    ],
    ingredients: 'Lakadong Turmeric, Green Cardamom, Black Pepper, Cinnamon, Dry Ginger, Saffron Strands.',
    variants: [
      { label: 'Artisan Jar (150g)', price: 380 }
    ]
  },
  {
    id: 'ginger-infused-honey',
    name: 'Ginger Infused Honey – Pure Floral Honey (55g)',
    category: 'Rituals',
    price: 280,
    originalPrice: 320,
    tag: 'Pure Honey',
    image: '/leafandlore/ginger_infused_honey.png',
    gallery: [
      '/leafandlore/ginger_infused_honey.png',
      '/leafandlore/spice_ritual_combo.png'
    ],
    rating: 4.9,
    reviews: 95,
    description: [
      'Pure single-origin raw honey gently infused with spicy ginger root.',
      'Perfect for sweetening herbal teas, morning warm water, or comforting the throat.'
    ],
    benefits: [
      'Raw, unpasteurized, cold-infused with organic ginger',
      'Natural digestive fire stimulator',
      'Velvety smooth sweetness with an invigorating ginger kick'
    ],
    ingredients: '100% Raw Wildflower Honey, Fresh Ginger Extract.',
    variants: [
      { label: 'Petite Jar (55g)', price: 280 }
    ]
  },
  {
    id: 'citrus-glow',
    name: 'Citrus Glow – Botanical Orange Peel Powder Ritual (100g)',
    category: 'Skincare',
    price: 299,
    originalPrice: 399,
    tag: 'Botanical Skincare',
    image: '/leafandlore/citrus_glow.png',
    gallery: ['/leafandlore/citrus_glow.png'],
    rating: 4.9,
    reviews: 165,
    description: [
      'A refreshing botanical powder crafted for your everyday skincare ritual.',
      'Helps cleanse, brighten, and leave your skin feeling fresh, soft, and renewed.'
    ],
    benefits: [
      'Natural Vitamin C and gentle AHA fruit acids',
      'Gently lifts dead skin and restores glow',
      'Pure single-ingredient plant powder'
    ],
    ingredients: '100% Pure Sun-Dried Orange Peel Powder (Citrus sinensis).',
    howToUse: [
      'Mix 1 teaspoon with rose water, milk, or raw honey to make a paste',
      'Apply gently on face and neck',
      'Leave for 10–15 minutes and rinse with lukewarm water.'
    ],
    variants: [
      { label: '100g Stand-up Pouch', price: 299 }
    ]
  },
  {
    id: 'green-purity',
    name: 'Green Purity – Botanical Neem Leaf Powder (100g)',
    category: 'Skincare',
    price: 299,
    originalPrice: 399,
    tag: 'Botanical Skincare',
    image: '/leafandlore/green_purity.png',
    gallery: ['/leafandlore/green_purity.png'],
    rating: 4.8,
    reviews: 130,
    description: [
      'A refreshing neem leaf powder crafted for your everyday skincare ritual.',
      'Helps purify, deep-cleanse pores, and support naturally healthier-looking, blemish-free skin.'
    ],
    benefits: [
      'Traditional antibacterial & clarifying remedy',
      'Calms breakouts and controls excess sebum',
      'Pure shade-dried Indian neem'
    ],
    ingredients: '100% Pure Organic Neem Leaf Powder (Azadirachta indica).',
    howToUse: [
      'Mix with aloe vera gel or water into a smooth paste',
      'Apply to skin and rinse after 10 minutes.'
    ],
    variants: [
      { label: '100g Stand-up Pouch', price: 299 }
    ]
  },
  {
    id: 'multani-mitti',
    name: 'Earth Clay – Pure Multani Mitti Clarifying Ritual (100g)',
    category: 'Skincare',
    price: 249,
    originalPrice: 299,
    tag: 'Botanical Skincare',
    image: '/leafandlore/multani_mitti.png',
    gallery: ['/leafandlore/multani_mitti.png'],
    rating: 4.9,
    reviews: 210,
    description: [
      'A naturally purifying Fuller’s earth clay powder crafted for a deeper cleansing ritual.',
      'Helps absorb excess oil, decongest pores, and leave skin feeling clean, fresh, and balanced.'
    ],
    benefits: [
      'Pore-refining mineral clay from ancient earth deposits',
      'Cools irritated skin during summer and humid months',
      'Zero additives, chemical-free'
    ],
    ingredients: '100% Natural Fuller’s Earth (Bentonite / Multani Mitti).',
    howToUse: [
      'Mix with rose water or chilled yogurt',
      'Apply evenly and rinse once dry.'
    ],
    variants: [
      { label: '100g Pouch', price: 249 }
    ]
  },
  {
    id: 'rose-veil',
    name: 'Rose Veil – Botanical Rose Petal Powder (100g)',
    category: 'Skincare',
    price: 349,
    originalPrice: 420,
    tag: 'Botanical Skincare',
    image: '/leafandlore/rose_veil.png',
    gallery: ['/leafandlore/rose_veil.png'],
    rating: 5.0,
    reviews: 188,
    description: [
      'A gentle rose petal powder crafted for a soothing skincare ritual.',
      'Helps soften, refresh, and leave your skin feeling delicately fragrant and naturally radiant.'
    ],
    benefits: [
      'Deeply hydrating botanical tonic for dry or sensitive skin',
      'Natural astringent properties that soothe redness',
      'Divine aromatic experience during self-care rituals'
    ],
    ingredients: '100% Pure Damask Rose Petal Powder (Rosa damascena).',
    variants: [
      { label: '100g Pouch', price: 349 }
    ]
  },
  {
    id: 'tea-for-two',
    name: 'Tea For Two – Handcrafted Fluted Ceramic Mugs Gift Set',
    category: 'Drinkware',
    price: 999,
    originalPrice: 1299,
    tag: 'Gift Set',
    image: '/leafandlore/tea_for_two_mugs.png',
    gallery: [
      '/leafandlore/tea_for_two_mugs.png',
      '/leafandlore/ceramic_mugs_trio.png'
    ],
    rating: 5.0,
    reviews: 147,
    description: [
      'Because some conversations deserve real mugs, not just messages.',
      'Not every meaningful moment needs a grand occasion. Sometimes, all it takes is two mugs, a quiet corner, and someone whose company feels like home.',
      'Tea For Two is designed to celebrate slow mornings, late-night conversations, and the little rituals that bring people closer.',
      'Presented in the signature Leaf & Lore gift box.'
    ],
    benefits: [
      'Two artisan stoneware mugs with tactile vertical fluting',
      'Deep earthy sage-green reactive glaze with toasted rim',
      'Signature Leaf & Lore keepsake gift packaging',
      'Microwave & dishwasher safe'
    ],
    ingredients: 'High-fire ceramic stoneware, food-safe lead-free glazes.',
    variants: [
      { label: 'Set of 2 Fluted Mugs + Signature Box', price: 999 }
    ]
  },
  {
    id: 'ceramic-loop-mugs',
    name: 'Artisan Matte Ceramic Loop Mugs – Trio Set',
    category: 'Drinkware',
    price: 1199,
    originalPrice: 1499,
    tag: 'New Collection',
    image: '/leafandlore/ceramic_mugs_trio.png',
    gallery: [
      '/leafandlore/ceramic_mugs_trio.png',
      '/leafandlore/tea_for_two_mugs.png'
    ],
    rating: 4.9,
    reviews: 92,
    description: [
      'Stylish matte-finish ceramic mugs in soft pink, warm beige, and olive green, featuring rounded ergonomic shapes and chunky loop handles.',
      'Tactile, joyful companions for your morning matcha, herbal brew, or slow afternoon coffee.'
    ],
    benefits: [
      'Contemporary modern silhouette with comfortable chunky loop handle',
      'Three soothing earth tones: Soft Rose, Warm Sand, Forest Olive',
      'Generous 350ml capacity'
    ],
    variants: [
      { label: 'Complete Trio Set (3 Mugs)', price: 1199 },
      { label: 'Single Mug (Choose Color in Notes)', price: 449 }
    ]
  },
  {
    id: 'dear-tired-women',
    name: 'Dear Tired Women – Book by Dr. Pooja Dhingra',
    category: 'Reading',
    price: 499,
    originalPrice: 599,
    tag: 'Author Edition',
    image: '/leafandlore/dear_tired_women_book.png',
    gallery: [
      '/leafandlore/dear_tired_women_book.png',
      '/leafandlore/founder_dr_pooja.png'
    ],
    rating: 5.0,
    reviews: 320,
    description: [
      'Words to Sit With: For Women Carrying Too Much for Too Long.',
      'A little something for the mind and the heart. Thoughtful words, honest reflections, and stories that remind you to pause, breathe, and make space for yourself.',
      'A comforting companion for slow mornings, quiet evenings, and everything in between.',
      'Written by Dr. Pooja Dhingra (Dental Surgeon, Public Health Professional & Founder of Leaf & Lore).'
    ],
    benefits: [
      'Heartfelt, grounding reflections on womanhood and rest',
      'Author signed copy with exclusive bookmark',
      'The guiding inspiration behind the Leaf & Lore philosophy'
    ],
    variants: [
      { label: 'Paperback (Author Edition)', price: 499 },
      { label: 'Wellness Bundle (Book + Her Balance Tea)', price: 1199, compareAtPrice: 1398 }
    ]
  },
  {
    id: 'corporate-gifting-hamper',
    name: 'For Business & Gifting – Mindful Rituals Hamper',
    category: 'Gifting',
    price: 1899,
    originalPrice: 2400,
    tag: 'Corporate & Custom',
    image: '/leafandlore/catalogue_hero_cover.png',
    gallery: [
      '/leafandlore/catalogue_hero_cover.png',
      '/leafandlore/spice_ritual_combo.png',
      '/leafandlore/tea_for_two_mugs.png'
    ],
    rating: 5.0,
    reviews: 74,
    description: [
      'FOR CELEBRATIONS. FOR GIFTING. FOR GOOD.',
      'We’re open to mindful care packages, celebratory hampers, and thoughtful brand collaborations.',
      'Whether you’re looking to introduce mindful wellness to your customers or find meaningful gifts for your team and clients, every hamper is crafted with intention and beauty.'
    ],
    benefits: [
      'Custom branding, wax seal, and personalized handwritten cards',
      'Curated mix of botanical teas, wholesome makhana, and stoneware',
      'Dedicated corporate concierge support'
    ],
    variants: [
      { label: 'Signature Mindful Hamper', price: 1899 },
      { label: 'Bespoke Corporate Order (Inquire)', price: 1899 }
    ]
  }
];
