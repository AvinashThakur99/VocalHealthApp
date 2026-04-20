import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';

const ALL_SUGGESTIONS = [
  "💧 Drink 2 glasses of warm water every morning — vocal cords stay hydrated",
"🍯 Honey and ginger mixture is very good for the throat",
"🚭 Stop smoking completely — it directly damages vocal cords",
"😴 Sleep 7–8 hours daily — body works in repair mode",
"🎤 Avoid too much shouting — biggest cause of vocal strain",
"🍵 Drink green tea — antioxidants improve vocal health",
"🌬️ Breathe through your nose, not mouth — throat won’t get dry",
"💊 Take Vitamin C daily — immunity stays strong, prevents infections",
"🏃 Exercise 30 minutes daily — blood circulation improves",
"🧘 Do meditation — stress affects voice quality",
"🥗 Eat fresh fruits and vegetables — vitamins are important for vocal health",
"🌡️ Gargle with warm water and salt — throat stays clean",
"📱 Don’t talk too much on phone — give proper voice rest",
"🥛 Don’t drink cold milk — it creates mucus in the throat",
"🌿 Drink tulsi decoction — natural throat healer",
"🎵 Do light humming — best for vocal warm-up",
"💦 Drink 8–10 glasses of water daily — hydration is key",
"🍋 Warm water with lemon and honey — protects from throat infection",
"🧄 Eat garlic — antibacterial properties protect from infection",
"😌 Don’t take stress — stress can cause voice tremors",
"🌙 Drink warm milk before sleep — throat gets soothed",
"🏥 If hoarseness lasts more than 3 days, consult a doctor",
"🎤 Do vocal warm-up before recording",
"🍎 Eat an apple daily — keeps the doctor away",
"🧴 Use a humidifier — dry air damages vocal cords",
"⏰ Drink water every 2 hours — don’t let throat dry",
"🌸 Take steam — clears nasal congestion and throat",
"📴 Don’t use phone at night — get proper sleep",
"🥜 Eat less spicy food — acid reflux affects throat",
"🫀 Practice deep breathing — improves voice projection",

"Start your day by drinking a full glass of water 💧 to rehydrate your body after sleep and help kickstart your metabolism for better energy levels throughout the morning.",

"Maintain a consistent sleep schedule 😴 by going to bed and waking up at the same time every day, which helps regulate your circadian rhythm and improves sleep quality.",

"Engage in at least 30 minutes of moderate physical activity 🏃‍♂️ such as walking, jogging, or cycling to support heart health and maintain overall fitness.",

"Eat a balanced breakfast 🍳 that includes protein, healthy fats, and complex carbohydrates to provide sustained energy and prevent mid-morning fatigue.",

"Take short breaks every 45–60 minutes ⏳ during work to stretch your body, reduce eye strain, and improve productivity.",

"Practice mindfulness or meditation 🧘‍♂️ for at least 10 minutes daily to reduce stress, improve focus, and support emotional well-being.",

"Include a variety of fruits and vegetables 🥬 in your daily meals to ensure your body gets essential vitamins, minerals, and antioxidants.",

"Avoid excessive consumption of processed and packaged foods 🍔❌ as they often contain unhealthy additives, salt, and sugar.",

"Stay hydrated throughout the day 💦 by drinking water regularly, even when you are not feeling thirsty.",

"Maintain proper posture while sitting 💻 by keeping your back straight and shoulders relaxed to prevent long-term spinal issues.",

"Take the stairs instead of the elevator 🪜 whenever possible to increase daily physical activity and improve cardiovascular health.",

"Practice deep breathing exercises 🌬️ during stressful situations to calm your mind and regulate your nervous system.",

"Reduce screen time before bedtime 📵 to improve sleep quality and prevent disruptions caused by blue light exposure.",

"Eat slowly and chew your food properly 🍽️ to aid digestion and help your body recognize fullness, preventing overeating.",

"Spend at least 15–20 minutes outdoors in sunlight ☀️ daily to boost vitamin D levels and improve mood.",

"Incorporate strength training exercises 💪 two to three times a week to build muscle and improve metabolism.",

"Keep your living and working environment clean 🧹 to reduce the risk of infections and maintain a healthy lifestyle.",

"Stay socially connected 🤝 by interacting with friends and family regularly to support emotional and mental health.",

"Limit your sugar intake 🍬❌ to reduce the risk of obesity, diabetes, and other chronic health conditions.",

"Drink herbal teas 🍵 such as green tea or chamomile to relax your body and support digestion.",

"Warm up before any physical activity 🔥 to prepare your muscles and reduce the risk of injuries.",

"Cool down after workouts 🧘 to help your body recover and prevent muscle stiffness.",

"Maintain a healthy body weight ⚖️ through balanced eating and regular physical activity.",

"Avoid smoking 🚭 and exposure to secondhand smoke to protect your lungs and heart.",

"Limit alcohol consumption 🍺❌ to reduce long-term health risks and maintain liver health.",

"Include healthy fats 🥑 such as nuts, seeds, and avocados in your diet to support brain and heart function.",

"Monitor your health regularly 🩺 by checking blood pressure, weight, and other vital indicators.",

"Keep a reusable water bottle with you 💧 as a reminder to stay hydrated throughout the day.",

"Stretch your body daily 🤸‍♂️ to improve flexibility and reduce muscle stiffness.",

"Avoid late-night eating 🌙❌ as it can negatively affect digestion and disrupt sleep.",

"Practice gratitude daily 🙏 to improve mental well-being and maintain a positive outlook on life.",

"Take time to relax and unwind ☕ to reduce stress and prevent burnout.",

"Use proper lifting techniques 📦 to avoid injuries when carrying heavy objects.",

"Maintain good personal hygiene 🧼 by washing hands regularly and keeping yourself clean.",

"Ensure proper ventilation in your home 🌬️ to maintain good air quality and respiratory health.",

"Wear comfortable and supportive footwear 👟 to prevent foot and posture-related problems.",

"Set realistic fitness goals 🎯 and track your progress to stay motivated.",

"Avoid multitasking excessively ⚠️ and focus on one task at a time for better efficiency and reduced stress.",

"Consume adequate protein 🍗 in your meals to support muscle repair and growth.",

"Use sunscreen 🧴 when going outdoors to protect your skin from harmful UV rays.",

"Take care of your mental health 🧠 by seeking support when feeling overwhelmed or anxious.",

"Limit caffeine intake ☕ especially in the evening to avoid sleep disturbances.",

"Engage in hobbies 🎨 that you enjoy to relax your mind and improve overall happiness.",

"Avoid prolonged sitting 🪑 by standing or walking around every hour.",

"Start your meals with salads 🥗 to increase your intake of fiber and nutrients.",

"Practice positive self-talk 😊 to boost confidence and reduce stress.",

"Keep emergency health contacts 📋 easily accessible in case of emergencies.",

"Smile often 😊 as it can help reduce stress and improve mood naturally.",

"Drink water before meals 💧 to help control appetite and prevent overeating.",

"Maintain a daily routine 📅 to bring structure and balance to your life.",


"Stay mindful of your portion sizes 🍽️ by serving appropriate amounts of food, which helps prevent overeating and supports maintaining a healthy weight over time.",

"Include probiotic-rich foods like yogurt or fermented items 🥛 in your diet to support gut health and improve digestion naturally.",

"Make it a habit to walk after meals 🚶‍♂️ for 10–15 minutes to aid digestion and help regulate blood sugar levels effectively.",

"Keep your bedroom cool, dark, and quiet 🌙 to create an ideal environment for deep and uninterrupted sleep.",

"Drink warm water in the morning 💧 to gently stimulate digestion and help your body eliminate toxins more efficiently.",

"Use smaller plates 🍽️ to naturally control portion sizes and reduce the tendency to overeat during meals.",

"Avoid comparing your fitness journey with others ⚖️ and focus on your own progress to stay motivated and consistent.",

"Plan your meals in advance 📅 to ensure you are eating balanced and nutritious foods instead of relying on unhealthy options.",

"Keep healthy snacks like fruits and nuts 🍎 readily available to avoid reaching for junk food when hungry.",

"Practice gratitude journaling 📓 by writing down a few positive things each day to improve mental well-being.",

"Limit your intake of fried foods 🍟❌ as they can increase the risk of heart disease and negatively impact overall health.",

"Focus on maintaining a strong core 💪 through exercises like planks to support posture and prevent back pain.",

"Take care of your eye health 👀 by following the 20-20-20 rule when using screens for long durations.",

"Drink water immediately after waking up 💧 to activate internal organs and promote better hydration from the start of the day.",

"Use natural light whenever possible ☀️ instead of artificial lighting to support your circadian rhythm.",

"Spend time with pets 🐶 if possible, as it can help reduce stress and improve emotional well-being.",

"Eat slowly without distractions 📵 to fully enjoy your meals and allow your body to recognize satiety signals.",

"Keep track of your daily steps 🚶 using a fitness tracker or app to stay aware of your activity level.",

"Avoid excessive salt intake 🧂 to help maintain healthy blood pressure levels and reduce cardiovascular risks.",

"Stretch your neck and shoulders regularly 🤸‍♂️ if you work on a computer to prevent stiffness and pain.",

"Engage in outdoor physical activities 🌳 like hiking or sports to combine exercise with fresh air and nature exposure.",

"Stay consistent with your workout routine 🔁 even if the intensity is low, as consistency is more important than intensity.",

"Drink water before feeling thirsty 💦 as thirst is often a late sign of dehydration.",

"Take time to unplug from digital devices 📵 regularly to reduce stress and improve mental clarity.",

"Maintain a healthy work-life balance ⚖️ by setting boundaries between professional and personal time.",

"Practice self-care routines 💆 such as skincare or relaxation activities to maintain overall well-being.",

"Include iron-rich foods 🥬 like spinach and legumes to support healthy blood circulation and prevent fatigue.",

"Start your day with light stretching 🤸 to improve flexibility and wake up your muscles gently.",

"Keep your immune system strong 🛡️ by eating nutritious foods and maintaining an active lifestyle.",

"Avoid excessive consumption of sugary snacks 🍬❌ to prevent energy crashes and long-term health issues.",

"Stay aware of your breathing patterns 🌬️ and practice slow, deep breathing when feeling anxious.",

"Eat meals at regular intervals ⏰ to maintain stable energy levels and support metabolism.",

"Spend quality time with loved ones ❤️ to strengthen relationships and support emotional health.",

"Practice good posture while using your phone 📱 by keeping it at eye level to avoid neck strain.",

"Keep your mind active 🧠 by learning new skills or engaging in educational activities regularly.",

"Drink fresh juices occasionally 🥤 but prefer whole fruits for better fiber intake.",

"Avoid skipping meals ❌ as it can lead to overeating later and disrupt your metabolism.",

"Stay organized 🗂️ in your daily tasks to reduce stress and improve productivity.",

"Ensure proper hydration during workouts 💦 to maintain performance and prevent fatigue.",

"Use relaxation techniques like listening to music 🎵 to calm your mind after a long day.",

"Maintain oral hygiene 🪥 by brushing and flossing daily to prevent dental issues.",

"Choose whole foods over refined products 🌾 to improve nutrient intake and overall health.",

"Spend time in silence 🤫 occasionally to allow your mind to rest and reset.",

"Eat a variety of colorful foods 🌈 to ensure a wide range of nutrients in your diet.",

"Keep your goals realistic 🎯 and achievable to avoid frustration and maintain motivation.",

"Take care of your joints 🦵 by including low-impact exercises like swimming or cycling.",

"Stay patient with your health journey ⏳ as long-term consistency leads to lasting results.",

"Drink herbal infusions 🌿 to support digestion and relaxation naturally.",

"Limit exposure to pollution 😷 whenever possible to protect your respiratory health.",

"Keep yourself motivated 🚀 by celebrating small health achievements regularly.",

"Practice mindful eating 🍽️ by focusing on taste, texture, and portion control.",

"Include calcium-rich foods 🥛 to support strong bones and teeth.",

"Stay active even on rest days 🚶 by engaging in light activities like walking.",

"Take proper rest when feeling unwell 🤒 instead of pushing your body too hard.",

"Keep your surroundings well-lit 💡 to reduce eye strain and improve focus.",

"Maintain a positive mindset 😊 even during challenging situations for better mental resilience.",

"Stay informed about your health 📚 by reading reliable sources and staying educated.",

"Engage in group activities 👥 to stay motivated and socially connected.",

"Keep your body moving throughout the day 🔄 instead of remaining sedentary for long hours.",

"Practice relaxation breathing before sleep 🌙 to improve sleep quality.",

"Use ergonomic furniture 🪑 to support your posture and prevent strain.",

"Maintain hydration during travel 🚗 to avoid fatigue and dehydration.",

"Eat protein-rich snacks 🍳 to maintain energy levels between meals.",

"Limit late-night screen exposure 📵 to maintain healthy sleep patterns.",

"Take care of your skin 🧴 by keeping it clean and moisturized regularly.",

"Stay disciplined with your habits 🔁 to achieve long-term health benefits.",

"Drink adequate water during hot weather ☀️ to prevent dehydration.",

"Focus on gradual improvements 📈 rather than drastic lifestyle changes.",

"Practice balance exercises 🧘 to improve stability and prevent injuries.",

"Spend time doing nothing occasionally 😌 to relax your mind and reduce stress.",

"Maintain clean eating habits 🥗 by avoiding unnecessary additives and preservatives.",

"Take time to reflect on your day 🌙 to improve self-awareness and growth.",

"Keep your phone usage limited 📱 to avoid mental overload and distraction.",

"Stay calm during stressful situations 😌 by practicing breathing techniques.",

"Include antioxidants in your diet 🍓 to support cellular health.",

"Engage in light stretching before bed 🤸 to relax muscles and improve sleep.",

"Stay consistent with hydration habits 💧 for better digestion and energy.",

"Maintain a balanced lifestyle ⚖️ with equal focus on physical and mental health.",

"Take breaks from continuous sitting 🪑 to improve blood circulation.",

"Eat mindfully without rushing 🍽️ to improve digestion and satisfaction.",

"Stay active during weekends 🏞️ to maintain fitness consistency.",

"Keep your goals flexible 🎯 to adapt to changes in your routine.",

"Practice kindness ❤️ as it positively impacts mental health.",

"Stay motivated by tracking your progress 📊 regularly.",

"Ensure proper recovery after workouts 🛌 to avoid burnout.",

"Drink enough fluids during illness 💧 to support recovery.",

"Maintain discipline in daily habits 🔁 for long-term success.",

"Stay positive and patient 😊 as good health is a continuous journey.",

"Begin your workouts with a proper warm-up routine 🔥 to gradually increase your heart rate and prepare your muscles for physical activity, reducing the risk of injury.",

"Focus on maintaining proper hydration before, during, and after exercise 💧 to support endurance, recovery, and overall performance.",

"Include stretching exercises in your daily routine 🤸‍♂️ to improve flexibility, reduce muscle tension, and enhance mobility over time.",

"Prioritize whole, unprocessed foods 🍎 over packaged items to ensure your body receives maximum nutrients without harmful additives.",

"Set aside time each day for relaxation 🛋️ to help your body recover from stress and maintain emotional balance.",

"Keep a consistent bedtime routine 🌙 such as reading or light stretching to signal your body that it’s time to wind down and sleep.",

"Limit consumption of caffeinated beverages ☕ in the afternoon and evening to prevent interference with your sleep cycle.",

"Practice active listening 👂 in conversations to build stronger relationships and reduce misunderstandings that can cause stress.",

"Use stairs whenever possible 🪜 to increase daily activity levels and improve cardiovascular health without needing extra time.",

"Include leafy greens like spinach and kale 🥬 in your diet to boost iron levels and support overall vitality.",

"Stay aware of your posture while standing 🧍 to prevent unnecessary strain on your back and neck muscles.",

"Take a few minutes each day to breathe deeply 🌬️ and consciously relax your shoulders, jaw, and facial muscles.",

"Engage in activities that challenge your brain 🧠 such as puzzles or learning a new skill to maintain cognitive health.",

"Drink a glass of water before every meal 💧 to support digestion and help regulate appetite.",

"Limit consumption of sugary beverages 🥤❌ and replace them with water or natural drinks for better metabolic health.",

"Keep your surroundings clutter-free 🧹 to promote mental clarity and reduce stress levels.",

"Spend time outdoors regularly 🌳 to reconnect with nature and improve both physical and mental well-being.",

"Include nuts and seeds 🌰 in your daily diet as they provide healthy fats, protein, and essential nutrients.",

"Make time for hobbies 🎨 that bring joy and relaxation, helping to reduce stress and improve life satisfaction.",

"Track your physical activity 📊 to stay motivated and identify areas where you can improve consistency.",

"Practice mindful breathing 🌬️ when feeling overwhelmed to quickly calm your nervous system and regain focus.",

"Ensure you get enough dietary fiber 🌾 to support digestion and maintain a healthy gut environment.",

"Take short walks during work breaks 🚶‍♂️ to improve circulation and reduce stiffness from prolonged sitting.",

"Keep your phone usage in check 📱 to avoid unnecessary mental fatigue and distraction.",

"Use ergonomic tools and furniture 🪑 to support your body and prevent long-term strain injuries.",

"Stay consistent with your health habits 🔁 even on busy days by making small but meaningful efforts.",

"Consume adequate amounts of protein 🍗 to support muscle repair and maintain overall strength.",

"Make it a habit to laugh often 😂 as laughter can reduce stress hormones and improve mood.",

"Maintain proper hygiene 🧼 by regularly washing hands and keeping personal items clean to prevent illness.",

"Drink water regularly throughout the day 💦 to maintain optimal hydration and support bodily functions.",

"Take care of your eyes 👀 by adjusting screen brightness and maintaining proper viewing distance.",

"Practice gratitude regularly 🙏 to shift focus toward positive aspects of life and improve emotional health.",

"Set achievable health goals 🎯 to maintain motivation and track your progress effectively.",

"Engage in social activities 👥 to strengthen relationships and enhance emotional well-being.",

"Eat slowly and without distractions 🍽️ to improve digestion and prevent overeating.",

"Maintain a clean sleeping environment 🛏️ to support better sleep quality and relaxation.",

"Limit exposure to negative news 📰❌ to protect your mental well-being and reduce anxiety.",

"Stay physically active throughout the day 🚶‍♂️ instead of relying solely on structured workouts.",

"Practice good time management ⏰ to reduce stress and maintain a balanced lifestyle.",

"Take time to reflect on your daily achievements 🌙 to build self-awareness and confidence.",

"Ensure proper ventilation in your home 🌬️ to maintain air quality and support respiratory health.",

"Stay motivated by celebrating small milestones 🎉 in your health journey.",

"Eat balanced meals regularly 🍽️ to maintain steady energy levels throughout the day.",

"Keep yourself hydrated during travel 🚗 to prevent fatigue and dehydration.",

"Practice gentle stretching before bedtime 🤸‍♂️ to relax muscles and prepare your body for sleep.",

"Limit consumption of highly processed snacks 🍟❌ to maintain better long-term health.",

"Stay aware of your mental health 🧠 and seek help when needed without hesitation.",

"Maintain a consistent workout schedule 🏋️ to build discipline and long-term fitness habits.",

"Take breaks from sitting every hour ⏳ to improve circulation and reduce stiffness.",

"Focus on proper breathing techniques 🌬️ during exercise to improve endurance and efficiency.",

"Eat a variety of foods 🌈 to ensure your body receives a wide range of nutrients.",

"Keep your living space organized 🏡 to reduce stress and improve productivity.",

"Spend time with loved ones ❤️ to strengthen emotional bonds and reduce loneliness.",

"Practice patience ⏳ in your health journey as lasting results take time and consistency.",

"Limit late-night snacking 🌙❌ to support better digestion and sleep quality.",

"Stay active during weekends 🏞️ to maintain consistency in your fitness routine.",

"Drink enough water during hot weather ☀️ to prevent dehydration and heat-related issues.",

"Take care of your skin 🧴 by keeping it clean and protected from environmental damage.",

"Practice positive thinking 😊 to maintain mental resilience and reduce stress.",

"Maintain discipline in your daily habits 🔁 to achieve long-term health goals.",

"Ensure proper recovery after workouts 🛌 to allow muscles to heal and grow.",

"Stay informed about your health 📚 by learning from reliable sources.",

"Engage in relaxation techniques like listening to music 🎵 to unwind after a long day.",

"Keep your goals flexible 🎯 to adapt to changes in your lifestyle.",

"Stay calm in stressful situations 😌 by focusing on solutions rather than problems.",

"Include antioxidant-rich foods 🍓 in your diet to support cellular health.",

"Practice mindful eating habits 🍽️ to improve digestion and satisfaction.",

"Stay active even on rest days 🚶‍♂️ by engaging in light physical activity.",

"Drink fluids regularly during illness 💧 to support recovery and hydration.",

"Maintain a balanced lifestyle ⚖️ by giving equal importance to physical and mental health.",

"Take small steps daily 🚶‍♂️ toward improving your health rather than aiming for perfection.",

"Keep your routine simple and sustainable 🔁 to ensure long-term consistency.",

"Practice self-discipline 💪 to stay committed to your health and wellness goals.",

"Stay optimistic 🌟 and believe in your ability to achieve better health over time.",

"Take time to disconnect from work 💻 to recharge mentally and physically.",

"Focus on quality over quantity 🍽️ when it comes to food choices.",

"Stay aware of your body's signals 🧠 and respond appropriately to hunger, fatigue, and stress.",

"Engage in activities that bring you peace 🌿 to maintain emotional balance.",

"Maintain regular eating patterns ⏰ to support digestion and metabolism.",

"Practice kindness toward yourself ❤️ to build a healthy and positive mindset.",

"Stay committed to your wellness journey 🚀 even when progress feels slow.",


"Start your morning with light stretching 🤸‍♂️ to gently wake up your muscles, improve circulation, and prepare your body for the day ahead.",

"Drink a glass of lukewarm water with lemon 🍋 to support digestion and give your metabolism a gentle boost in the morning.",

"Focus on eating home-cooked meals 🍲 whenever possible to have better control over ingredients and portion sizes.",

"Keep a consistent eating schedule ⏰ to regulate your metabolism and maintain stable energy levels throughout the day.",

"Take a few minutes to step outside for fresh air 🌬️ during your day to refresh your mind and improve focus.",

"Engage in low-impact exercises like walking or yoga 🧘‍♂️ on days when intense workouts feel too demanding.",

"Make sure to include healthy snacks between meals 🍎 to prevent excessive hunger and unhealthy food choices.",

"Limit intake of artificial sweeteners 🍬❌ as they may negatively impact metabolism and gut health over time.",

"Practice mindful hydration 💧 by sipping water consistently instead of consuming large amounts at once.",

"Maintain a clutter-free workspace 🖥️ to improve productivity and reduce unnecessary mental stress.",

"Keep your back supported while sitting 🪑 by using a cushion or ergonomic chair to maintain proper posture.",

"Spend a few minutes daily practicing deep relaxation techniques 🌙 to reduce stress and improve sleep quality.",

"Choose stairs over elevators 🪜 whenever possible to naturally increase your daily activity levels.",

"Eat a protein-rich breakfast 🍳 to help maintain energy levels and reduce cravings later in the day.",

"Keep your body active throughout the day 🚶‍♂️ by incorporating movement into your routine, even during work hours.",

"Limit your intake of carbonated drinks 🥤❌ as they often contain excess sugar and empty calories.",

"Focus on maintaining a calm mindset 😌 during stressful situations by practicing breathing exercises.",

"Spend time doing activities that bring joy 🎨 to help maintain emotional balance and reduce burnout.",

"Ensure your sleeping area is comfortable and distraction-free 🛏️ to support deep and restful sleep.",

"Take short digital detox breaks 📵 to reduce screen fatigue and improve mental clarity.",

"Include whole grains 🌾 in your diet to provide long-lasting energy and support digestive health.",

"Stay aware of your daily habits 🔍 and make small improvements consistently for long-term benefits.",

"Keep your hands clean 🧼 by washing them regularly to prevent infections and maintain hygiene.",

"Drink enough fluids during workouts 💦 to maintain performance and avoid dehydration.",

"Practice slow and controlled breathing 🌬️ during exercise to improve endurance and oxygen efficiency.",

"Spend time with supportive people ❤️ who encourage your health and well-being.",

"Limit excessive multitasking ⚠️ to improve focus and reduce stress levels.",

"Eat a variety of nutrient-dense foods 🍽️ to ensure balanced nutrition and overall health.",

"Stay patient with your progress ⏳ as sustainable health improvements take time.",

"Maintain proper lighting 💡 while working to reduce eye strain and improve concentration.",

"Practice gratitude regularly 🙏 to improve emotional resilience and happiness.",

"Take breaks from prolonged sitting ⏳ to stretch and maintain blood circulation.",

"Ensure proper hydration during travel 🚗 to prevent fatigue and dehydration.",

"Engage in activities that stimulate your mind 🧠 such as reading or learning new skills.",

"Maintain a positive outlook 😊 to help manage stress and improve overall well-being.",

"Keep your goals realistic 🎯 to avoid burnout and maintain long-term consistency.",

"Include healthy fats 🥑 in your diet to support brain function and heart health.",

"Practice relaxation techniques like listening to music 🎵 to unwind after a busy day.",

"Stay active on weekends 🏞️ to maintain consistency in your fitness journey.",

"Take care of your joints 🦵 by avoiding excessive strain and maintaining proper form during exercise.",

"Drink enough water during hot weather ☀️ to maintain hydration and prevent heat exhaustion.",

"Maintain a clean environment 🧹 to support both physical and mental health.",

"Practice mindful eating 🍽️ by focusing on taste and portion control.",

"Stay disciplined with your habits 🔁 to achieve lasting health benefits.",

"Include antioxidant-rich foods 🍓 in your meals to protect your body from oxidative stress.",

"Ensure proper rest and recovery 🛌 after physical activity to allow your body to heal.",

"Limit late-night screen exposure 📵 to support better sleep quality.",

"Take time to relax your mind 🧘‍♂️ after a long day to reduce stress.",

"Stay motivated by tracking your progress 📊 and celebrating small wins.",

"Focus on building healthy habits gradually 📈 instead of making drastic changes.",

"Drink water before meals 💧 to support digestion and appetite control.",

"Maintain a balanced lifestyle ⚖️ by giving attention to both physical and mental health.",

"Practice patience and consistency ⏳ as they are key to long-term wellness.",

"Engage in outdoor activities 🌳 to combine exercise with fresh air and relaxation.",

"Keep your phone usage minimal 📱 to reduce mental overload and improve focus.",

"Stay aware of your posture 🧍 while standing and sitting to prevent strain.",

"Take time to reflect on your goals 🌙 to stay aligned with your health journey.",

"Ensure proper nutrition 🍎 to fuel your body for daily activities.",

"Practice breathing exercises 🌬️ regularly to manage stress effectively.",

"Stay connected with friends and family 🤝 for emotional support.",

"Limit consumption of junk food 🍔❌ to maintain long-term health.",

"Keep your routine flexible 🔄 to adapt to changes in your schedule.",

"Take care of your skin 🧴 by maintaining cleanliness and hydration.",

"Stay committed to your fitness routine 🏋️ to build consistency.",

"Maintain hydration throughout the day 💦 to support bodily functions.",

"Focus on self-improvement 🌟 rather than perfection.",

"Spend time doing activities that relax you 🌿 to reduce stress.",

"Eat at regular intervals ⏰ to maintain stable energy levels.",

"Stay calm during challenges 😌 by focusing on solutions.",

"Practice self-care regularly 💆 to maintain overall well-being.",

"Keep yourself motivated 🚀 by setting achievable milestones.",

"Ensure proper sleep hygiene 😴 for better recovery and energy.",

"Stay active even during busy days 🚶‍♂️ by incorporating small movements.",

"Take time to disconnect from work 💻 to recharge mentally.",

"Maintain a healthy mindset 🧠 to support your overall health journey.",

"Begin your day with a few minutes of mindful breathing 🌬️ to center your thoughts, reduce anxiety, and prepare yourself mentally for the day ahead.",

"Keep a consistent hydration habit 💧 by carrying a water bottle and taking small sips throughout the day instead of drinking large amounts at once.",

"Prioritize whole, nutrient-dense foods 🍎 over calorie-dense processed foods to support long-term health and sustained energy levels.",

"Make time for regular health checkups 🩺 to detect potential issues early and maintain awareness of your physical condition.",

"Include stretching in your daily routine 🤸‍♂️ to improve flexibility, reduce muscle tension, and prevent injuries.",

"Limit your intake of high-sodium foods 🧂❌ to maintain healthy blood pressure and reduce strain on your heart.",

"Take a few minutes daily to sit quietly in silence 🤫 to relax your mind and enhance mental clarity.",

"Practice proper breathing techniques 🌬️ during physical activity to maximize performance and oxygen efficiency.",

"Eat slowly and avoid distractions 🍽️ while eating to improve digestion and prevent overeating.",

"Maintain a balanced intake of macronutrients ⚖️ including carbohydrates, proteins, and fats for optimal body function.",

"Ensure you get adequate sunlight exposure ☀️ to support vitamin D production and boost your mood.",

"Stay mindful of your caffeine intake ☕ and avoid excessive consumption to prevent sleep disturbances and anxiety.",

"Engage in activities that reduce stress 🧘‍♂️ such as yoga, meditation, or creative hobbies.",

"Take breaks from long periods of sitting ⏳ to stretch your legs and improve blood circulation.",

"Keep your sleeping environment comfortable 🛏️ by adjusting lighting, temperature, and noise levels for better rest.",

"Stay socially active 🤝 by connecting with friends, family, or community groups to support emotional well-being.",

"Include fiber-rich foods 🌾 in your diet to improve digestion and maintain gut health.",

"Practice positive thinking 😊 by focusing on solutions instead of problems to improve mental resilience.",

"Maintain proper hygiene 🧼 by regularly washing hands and keeping personal items clean.",

"Drink sufficient fluids 💦 during exercise to prevent dehydration and maintain performance.",

"Keep your goals realistic 🎯 and adjust them as needed to stay motivated and avoid burnout.",

"Engage in regular physical activity 🏃‍♂️ to strengthen your body and improve overall endurance.",

"Spend time outdoors 🌳 to refresh your mind and gain the benefits of fresh air and nature.",

"Practice self-care routines 💆 such as relaxation, skincare, or hobbies to support mental health.",

"Eat meals at consistent times ⏰ to regulate your metabolism and maintain energy balance.",

"Limit exposure to excessive screen time 📱 to reduce eye strain and mental fatigue.",

"Take care of your posture 🧍 to prevent back and neck pain during daily activities.",

"Stay organized 🗂️ to reduce stress and improve efficiency in your daily routine.",

"Include antioxidant-rich foods 🍓 in your meals to protect your body from oxidative damage.",

"Practice deep breathing 🌬️ when feeling stressed to calm your nervous system.",

"Stay active during the day 🚶‍♂️ by incorporating small movements and avoiding prolonged inactivity.",

"Maintain a clean living space 🏡 to support both physical health and mental clarity.",

"Drink water before meals 💧 to aid digestion and prevent overeating.",

"Stay disciplined with your habits 🔁 to achieve consistent and lasting health improvements.",

"Take time to relax and unwind 🛋️ after a busy day to reduce stress and restore energy.",

"Focus on gradual improvements 📈 rather than expecting immediate results in your health journey.",

"Engage in social interactions 👥 to build meaningful relationships and emotional support.",

"Limit junk food intake 🍔❌ to maintain a healthy diet and prevent chronic diseases.",

"Ensure proper rest and recovery 🛌 after physical exertion to allow your body to heal.",

"Stay mindful of your emotional health ❤️ and address stress or anxiety proactively.",

"Keep yourself motivated 🚀 by tracking your progress and celebrating small achievements.",

"Practice mindful eating 🍽️ by paying attention to hunger cues and portion sizes.",

"Stay hydrated in all seasons 💦, not just during hot weather, to support bodily functions.",

"Maintain a balanced lifestyle ⚖️ with equal focus on physical, mental, and emotional well-being.",

"Spend time doing activities you enjoy 🎨 to relax your mind and improve happiness.",

"Stay aware of your body’s signals 🧠 and respond appropriately to fatigue or discomfort.",

"Engage in relaxation techniques 🌿 such as meditation or gentle stretching before bed.",

"Limit late-night eating 🌙❌ to improve digestion and sleep quality.",

"Practice patience ⏳ as building a healthy lifestyle requires time and consistency.",

"Stay active even on rest days 🚶‍♂️ by doing light activities like walking or stretching.",

"Maintain proper hydration during illness 💧 to support recovery and prevent weakness.",

"Keep your routine simple and sustainable 🔁 for long-term adherence.",

"Practice kindness toward yourself ❤️ and avoid harsh self-criticism in your health journey.",

"Focus on building healthy habits 🧩 that can be maintained for life rather than short-term fixes.",

"Stay calm during stressful situations 😌 by focusing on breathing and positive thinking.",

"Ensure proper nutrition 🍎 to fuel your body for daily tasks and activities.",

"Spend time reflecting on your goals 🌙 to stay aligned with your wellness journey.",

"Limit consumption of processed foods 🍟❌ to improve overall health and reduce risks.",

"Stay committed to your routine 🏋️ even when motivation is low, as discipline builds consistency.",

"Take time to disconnect from technology 📵 to refresh your mind and reduce stress.",

"Engage in activities that promote relaxation 🧘‍♂️ to maintain mental balance.",

"Keep your environment peaceful 🌿 to support relaxation and focus.",

"Maintain regular eating habits ⏰ to stabilize metabolism and energy levels.",

"Stay optimistic 🌟 and believe in your ability to improve your health over time.",

"Practice self-awareness 🧠 by observing your habits and making necessary adjustments.",

"Stay consistent with hydration 💧 to support digestion, circulation, and energy.",

"Engage in light stretching daily 🤸‍♂️ to maintain flexibility and prevent stiffness.",

"Maintain a positive mindset 😊 to overcome challenges in your health journey.",

"Take small steps daily 🚶‍♂️ toward better health instead of aiming for perfection.",

"Stay focused on long-term goals 🎯 rather than short-term results.",

"Practice relaxation before sleep 🌙 to improve sleep quality and recovery.",

"Stay physically active 🏃‍♂️ to maintain strength, endurance, and overall well-being.",

"Keep yourself inspired 🌟 by learning more about health and wellness regularly.",

"Maintain discipline in your habits 🔁 as consistency leads to lasting success.",

"Take care of your mental well-being 🧠 by addressing stress and maintaining balance.",

"Stay engaged in meaningful activities ❤️ that bring purpose and fulfillment.",

"Continue improving your lifestyle gradually 📈 for sustainable and long-lasting health benefits."




]
export default function Dashboard() {
  const isDark = useColorScheme() === 'dark';
  const healthScore = 87;
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const suggestionFade = useRef(new Animated.Value(1)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const barAnims = useRef(Array.from({ length: 3 }, () => new Animated.Value(0))).current;

  const bg1 = isDark ? '#020617' : '#eef2ff';
  const bg2 = isDark ? '#080d2e' : '#e0e7ff';
  const bg3 = isDark ? '#0f1535' : '#c7d2fe';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#64748b' : '#64748b';
  const cardBg = isDark ? '#0d1526' : '#ffffff';
  const cardBorder = isDark ? '#1e293b' : '#c7d2fe';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 35, friction: 8, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 30, friction: 6, delay: 200, useNativeDriver: true }),
      Animated.timing(progressAnim, { toValue: healthScore, duration: 1500, delay: 500, useNativeDriver: false }),
    ]).start();

    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.08, duration: 1500, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.timing(rotateAnim, { toValue: 1, duration: 8000, useNativeDriver: true })).start();

    barAnims.forEach((bar, i) => {
      Animated.loop(Animated.sequence([
        Animated.delay(i * 300),
        Animated.timing(bar, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(bar, { toValue: 0.3, duration: 600, useNativeDriver: true }),
      ])).start();
    });

    // Har 3 ghante mein suggestion change karo
    // Testing ke liye 10 seconds rakha hai — production mein 10800000 (3 hours) karna
    const interval = setInterval(() => {
      Animated.timing(suggestionFade, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
        setSuggestionIndex(prev => (prev + 1) % ALL_SUGGESTIONS.length);
        Animated.timing(suggestionFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const timeline = [
    { time: '08:00 AM', label: 'Morning', status: 'Healthy', color: '#22c55e', icon: '🌅' },
    { time: '12:00 PM', label: 'Afternoon', status: 'Healthy', color: '#38bdf8', icon: '☀️' },
    { time: '06:00 PM', label: 'Evening', status: 'Mild Strain', color: '#f59e0b', icon: '🌆' },
    { time: '10:00 PM', label: 'Night', status: 'Healthy', color: '#6366f1', icon: '🌙' },
  ];

  return (
    <LinearGradient colors={[bg1, bg2, bg3]} style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={[styles.greeting, { color: subColor }]}>Your Health Report 📋</Text>
          <Text style={[styles.title, { color: '#6366f1' }]}>📊 Dashboard</Text>
        </Animated.View>

        {/* MAIN SCORE CARD */}
        <Animated.View style={[styles.scoreCard, {
          backgroundColor: cardBg, borderColor: '#6366f1',
          opacity: fadeAnim, transform: [{ scale: scaleAnim }],
          shadowColor: '#6366f1',
        }]}>
          <Animated.View style={[styles.rotatingRing, { transform: [{ rotate: spin }] }]} />
          <View style={styles.scoreRow}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <LinearGradient colors={['#4f46e5', '#7c3aed', '#9333ea']} style={styles.circleOuter}>
                <View style={[styles.circleInner, { backgroundColor: isDark ? '#0d1526' : '#fff' }]}>
                  <Text style={[styles.circleScore, { color: '#6366f1' }]}>{healthScore}</Text>
                  <Text style={[styles.circleUnit, { color: subColor }]}>/100</Text>
                </View>
              </LinearGradient>
            </Animated.View>
            <View style={styles.scoreInfo}>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Healthy</Text>
              </View>
              <Text style={[styles.scoreTitle, { color: textColor }]}>Overall Vocal Health</Text>
              <View style={[styles.progressBg, { backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }]}>
                <Animated.View style={[styles.progressFill, {
                  width: progressAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
                }]} />
              </View>
              <Text style={[styles.progressText, { color: subColor }]}>{healthScore}% — Excellent</Text>
            </View>
          </View>
        </Animated.View>

        {/* STATS ROW */}
        <Animated.View style={[styles.statsRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {[
            { icon: '🎤', value: '24', label: 'Recordings', color: '#6366f1' },
            { icon: '✅', value: '21', label: 'Healthy', color: '#22c55e' },
            { icon: '⚠️', value: '3', label: 'Issues', color: '#f59e0b' },
            { icon: '🔥', value: '7', label: 'Streak', color: '#ef4444' },
          ].map((stat, i) => (
            <LinearGradient key={i} colors={isDark ? ['#0d1526', '#162033'] : ['#fff', '#f5f3ff']}
              style={[styles.statCard, { borderColor: stat.color + '40' }]}>
              <Text style={styles.statEmoji}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: subColor }]}>{stat.label}</Text>
            </LinearGradient>
          ))}
        </Animated.View>

        {/* TODAY TIMELINE */}
        <Animated.View style={[styles.timelineCard, {
          backgroundColor: cardBg, borderColor: cardBorder,
          opacity: fadeAnim, transform: [{ translateY: slideAnim }],
        }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>🕐 Today's Timeline</Text>
          {timeline.map((t, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <LinearGradient colors={[t.color, t.color + '80']} style={styles.timelineDot}>
                  <Text style={styles.timelineDotIcon}>{t.icon}</Text>
                </LinearGradient>
                {i < timeline.length - 1 && (
                  <View style={[styles.timelineLine, { backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }]} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timelineRow}>
                  <Text style={[styles.timelineLabel, { color: textColor }]}>{t.label}</Text>
                  <View style={[styles.timelineStatus, { backgroundColor: t.color + '20', borderColor: t.color + '60' }]}>
                    <Text style={[styles.timelineStatusText, { color: t.color }]}>{t.status}</Text>
                  </View>
                </View>
                <Text style={[styles.timelineTime, { color: subColor }]}>{t.time}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* HEALTH SUGGESTION — Har 3 ghante mein change */}
        <Animated.View style={[styles.suggestionCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <LinearGradient colors={['#4f46e5', '#7c3aed', '#9333ea']} style={styles.suggestionGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>

            {/* Header */}
            <View style={styles.suggestionHeader}>
              <View style={styles.suggestionTitleRow}>
                <Text style={styles.suggestionEmoji}>💡</Text>
                <Text style={styles.suggestionTitle}>Health Suggestion</Text>
              </View>
              <View style={styles.liveRow}>
                {barAnims.map((b, i) => (
                  <Animated.View key={i} style={[styles.aiBar, { opacity: b, height: 8 + i * 4 }]} />
                ))}
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>

            {/* Animated Suggestion Text */}
            <Animated.Text style={[styles.suggestionText, { opacity: suggestionFade }]}>
              {ALL_SUGGESTIONS[suggestionIndex]}
            </Animated.Text>

            {/* Counter */}
            <View style={styles.suggestionFooter}>
              <Text style={styles.suggestionCounter}>
                {suggestionIndex + 1} / {ALL_SUGGESTIONS.length}
              </Text>
              <Text style={styles.suggestionTimer}>🔄 Updates every 3 hours</Text>
            </View>

            {/* Tip Pills */}
            <View style={styles.tipPills}>
              {['💧 Hydration', '😴 Rest', '🚭 No Smoking'].map((tip, i) => (
                <View key={i} style={styles.tipPill}>
                  <Text style={styles.tipPillText}>{tip}</Text>
                </View>
              ))}
            </View>

          </LinearGradient>
        </Animated.View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  greeting: { fontSize: 13, marginTop: 10 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  scoreCard: { borderRadius: 28, padding: 22, marginBottom: 18, borderWidth: 1.5, elevation: 15, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, overflow: 'hidden' },
  rotatingRing: { position: 'absolute', width: 300, height: 300, borderRadius: 150, borderWidth: 1, borderColor: '#6366f115', top: -80, right: -80 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  circleOuter: { width: 104, height: 104, borderRadius: 52, padding: 4, elevation: 10 },
  circleInner: { flex: 1, borderRadius: 46, justifyContent: 'center', alignItems: 'center' },
  circleScore: { fontSize: 28, fontWeight: 'bold' },
  circleUnit: { fontSize: 11 },
  scoreInfo: { flex: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#22c55e20', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' },
  statusText: { color: '#22c55e', fontSize: 12, fontWeight: '700' },
  scoreTitle: { fontSize: 13, marginBottom: 10 },
  progressBg: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: 8, backgroundColor: '#6366f1', borderRadius: 4 },
  progressText: { fontSize: 11 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  statCard: { flex: 1, borderRadius: 18, padding: 12, alignItems: 'center', borderWidth: 1, elevation: 5, gap: 3 },
  statEmoji: { fontSize: 20 },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 9, textAlign: 'center' },
  timelineCard: { borderRadius: 22, padding: 20, marginBottom: 18, borderWidth: 1, elevation: 6 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 18 },
  timelineItem: { flexDirection: 'row', gap: 14, marginBottom: 4 },
  timelineLeft: { alignItems: 'center', width: 40 },
  timelineDot: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  timelineDotIcon: { fontSize: 16 },
  timelineLine: { width: 2, flex: 1, marginTop: 4, marginBottom: 4, borderRadius: 1 },
  timelineContent: { flex: 1, paddingBottom: 20 },
  timelineRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  timelineLabel: { fontSize: 15, fontWeight: '700' },
  timelineStatus: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, borderWidth: 1 },
  timelineStatusText: { fontSize: 11, fontWeight: '600' },
  timelineTime: { fontSize: 12 },

  // Suggestion Card
  suggestionCard: { borderRadius: 22, overflow: 'hidden', marginBottom: 18, elevation: 10, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 15 },
  suggestionGradient: { padding: 22 },
  suggestionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  suggestionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  suggestionEmoji: { fontSize: 22 },
  suggestionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  liveRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  aiBar: { width: 3, backgroundColor: '#ffffff60', borderRadius: 2 },
  liveText: { color: '#ffffff80', fontSize: 9, fontWeight: '700', marginLeft: 4 },
  suggestionText: { color: '#ffffff', fontSize: 15, lineHeight: 24, marginBottom: 16, fontWeight: '500' },
  suggestionFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  suggestionCounter: { color: '#ffffff60', fontSize: 11 },
  suggestionTimer: { color: '#ffffff80', fontSize: 11 },
  tipPills: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tipPill: { backgroundColor: '#ffffff20', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  tipPillText: { color: '#fff', fontSize: 11, fontWeight: '600' },
});