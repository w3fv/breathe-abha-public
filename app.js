(() => {
  "use strict";

  const data = window.ABHA_SAMPLE_DATA;
  const STORAGE = {
    theme: "abha-guide.theme",
    locale: "abha-guide.locale",
    planner: "abha-guide.planner.v3",
    legacyPlanner: "abha-guide.planner.v2",
    olderPlanner: "abha-guide.planner.v1"
  };
  const slots = ["morning", "noon", "evening", "night"];
  const maxPlannerDays = 14;
  const coreKeys = ["all", "nature", "food", "heritage"];
  const precisionKeys = ["specific", "area", "multiple", "confirmation"];
  const verificationKeys = ["verified", "caveat", "confirmation"];
  const operationKeys = ["unknown", "closed"];
  const plannerKeys = ["standard", "tentative", "unavailable"];
  const allowedMedia = {
    "mist-cafe": { image: "assets/photos/mist-cafe.jpeg" },
    "flap-cafe": { image: "assets/photos/flap-cafe.jpeg" },
    "le-cedre": { image: "assets/photos/le-cedre.jpeg" },
    "be-together": { image: "assets/photos/be-together.jpeg" },
    "neighbours-house": { image: "assets/photos/neighbours-house.jpeg" },
    "le-premier": { image: "assets/photos/le-premier.jpeg" },
    "talqah": { image: "assets/photos/talqah.jpeg" },
    "in-to": { image: "assets/photos/in-to.jpeg" },
    "nayer": { image: "assets/photos/nayer.jpeg" },
    "kunafelt": { image: "assets/photos/kunafelt.jpeg" },
    "al-rashid-mall": { image: "assets/photos/al-rashid-mall.jpeg" },
    "lavanda-park": { image: "assets/photos/lavanda-park.jpeg" },
    "mojan-park": { image: "assets/photos/mojan-park.jpeg" },
    "ala-bali": { image: "assets/photos/ala-bali.jpeg" },
    "turkish-fork": { image: "assets/photos/turkish-fork.jpeg" },
    "lantico": { image: "assets/photos/lantico.jpeg" },
    "falaq": { image: "assets/photos/falaq.jpeg" },
    "sabahk": { image: "assets/photos/sabahk.jpeg" },
    "sadaf": { image: "assets/photos/sadaf.jpeg" },
    "tarhab": { image: "assets/photos/tarhab.jpeg" },
    "dm-cafe": { image: "assets/photos/dm-cafe.jpeg" },
    "ashjar-farm": { image: "assets/photos/ashjar-farm.jpeg" },
    "al-muftaha": { video: "assets/videos/al-muftaha.mp4", poster: "assets/photos/al-muftaha-still.jpeg" },
    "al-soudah": { image: "assets/photos/al-soudah.jpeg" },
    "rijal-almaa": { image: "assets/photos/rijal-almaa.webp" },
    "shamsan-castle": { image: "assets/photos/shamsan-castle.jpeg" },
    "al-faraa": { image: "assets/photos/al-faraa.jpeg" },
    "seven-abha": { image: "assets/photos/seven-abha.jpeg" },
    "formula-e-karting": { image: "assets/photos/formula-e-karting.jpeg" },
    "cyber-bowling": { image: "assets/photos/cyber-bowling.jpeg" },
    "scene-cinema": { image: "assets/photos/scene-cinema.jpeg" },
    "discovery-adventures": { image: "assets/photos/discovery-adventures.jpeg" },
    "joe-and-the-juice": { image: "assets/photos/joe-and-the-juice.jpeg" }
  };
  const mediaImagePattern = /^assets\/photos\/[a-z0-9-]+\.(jpeg|webp)$/;
  const mediaVideoPattern = /^assets\/videos\/[a-z0-9-]+\.mp4$/;

  const ui = {
    en: {
      skip: "Skip to content", brandHome: "Breathe Abha home", primaryNavigation: "Primary navigation", categoryNavigation: "Browse another category", statusLegendLabel: "Listing status legend", mapImageAlt: "Original Aseer heritage illustration with mountains, Jacaranda branches and geometric motifs", mapFeaturedPlaces: "Featured places in this illustration", futureImageAlt: "Original future-facing Aseer illustration with mountains and luminous heritage-inspired details", pageTitleHome: "Breathe Abha — Aseer at your pace", pageTitleBrowse: "Explore Aseer — Breathe Abha", pageTitlePlanner: "Plan my day — Breathe Abha", pageTitleMap: "Area guide — Breathe Abha", pageTitleCategory: name => `${name} — Breathe Abha`,
      navHome: "Home", navExplore: "Explore", navPlanner: "Plan my day", navMap: "Area guide", themeLight: "Switch to light mode", themeDark: "Switch to dark mode", language: "العربية",
      tapToEnter: "Tap to enter", tapToEnterArabic: "اضغط للدخول", introStatus: "Opening film ready. Activate Tap to enter to begin with sound.", introPlayingStatus: "Opening film playing with sound.", introSoundOnStatus: "Sound is on for the opening film.", introSoundOffStatus: "Opening film is muted.", introUnavailable: "The opening film could not play. The landing is ready.", introDialogLabel: "Breathe Abha opening film", introControlsLabel: "Opening film controls", skipIntro: "Skip intro", soundOn: "Sound on", muteSound: "Mute sound", soundOnLabel: "Turn sound on for the opening film", muteSoundLabel: "Mute sound for the opening film", homeKicker: "Aseer, breathed slowly", homeTitle: "Breathe in Abha.", homeCopy: "Where mountain air, living heritage and generous welcomes turn every pause into a memory.", exploreAction: "Enter the guide",
      browseKicker: "Choose your pace", browseTitle: "A side of Aseer for every mood.", browseCopy: "Pick a category to open its considered places, Maps searches and planning actions.", categoryExplore: "Explore category", categoryCount: count => `${count} ${count === 1 ? "place" : "places"}`,
      backToCategories: "All categories", categoryOpened: name => `${name} selected.`, landingOpened: "Breathe Abha landing opened.", guideOpened: "Category guide opened.", plannerOpened: "Day planner opened.", mapOpened: "Area guide opened.",
      coreThemes: "Refine by theme", searchLabel: "Search this category", searchPlaceholder: "Search this category", monthLabel: "Outdoor guidance for", resultCount: (count, month) => `${count} ${count === 1 ? "place" : "places"}${month ? ` for ${month}` : ""}`, bestMonths: "Outdoor guidance", noMonthGuidance: "No month guidance", reset: "Clear filters", addPlan: "Add to plan", addTentative: "Add as tentative", addedPlan: "In your plan", mapsOpen: "Open in Google Maps", mapsSearch: "Search in Google Maps", openMapsFor: name => `Open ${name} in Google Maps`, searchMapsFor: name => `Search for ${name} in Google Maps`,
      verified: "Verified listing", caveat: "Check branch / location", confirmation: "Confirm venue details", closed: "Temporarily closed", tentative: "Tentative stop", statusLegend: "Listing status", statusHint: "Check status labels before you go. They are editorial guidance, not live availability.",
      emptyTitle: "No matching places yet.", emptyCopy: "Try another phrase or clear your filters to see this category.",
      plannerEyebrow: "Plan your stay", plannerTitle: "Build your Aseer itinerary.", plannerCopy: "Choose how long you will stay, then tap a time card to choose a place. Your choices stay only in this browser.", plannerNote: "Tap an empty time card to choose a place, or replace a stop whenever your plans change.", stayLength: "How long will you stay?", oneDay: "1 day", twoDays: "2 days", threeDays: "3 days", customDays: "Custom", customDaysLabel: "Number of days", customDaysHint: "Choose 1 to 14 days", day: count => `Day ${count}`, pickerTarget: (day, slot) => `Day ${day} · ${slot}`, placePickerTitle: "Choose a place", placePickerCopy: "Choose one place for this time in your itinerary.", closePicker: "Close", choosePlace: "Choose this place", morning: "Morning", noon: "Noon", evening: "Evening", night: "Night", emptySlot: "Tap to choose a place", replaceSlot: "Replace this slot", chooseStayLength: "Choose a stay length to create your empty itinerary.", videoFor: name => `${name} video`, videoPlay: "Play video", videoPause: "Pause video", videoPreview: "Play preview", videoControls: "Video controls", videoSoundOn: "Sound on", videoMute: "Mute sound", videoFullscreen: "View full screen", videoExitFullscreen: "Exit full screen", videoFullscreenUnavailable: "Full-screen video is not available in this browser.", videoMuted: "Video sound is muted.", videoSoundEnabled: "Video sound is on.", videoUnavailable: "This video could not play.", openImage: name => `Open full image of ${name}`, closeImage: "Close image viewer", previousImage: "Previous image", nextImage: "Next image", imagePosition: (current, total) => `Image ${current} of ${total}`, loadExample: "Load example", clearDay: "Clear day", clearPlan: "Clear all", removed: "Removed from your itinerary.", added: name => `${name} added to your itinerary.`, replaced: name => `${name} replaced the selected stop.`, addedTentative: name => `${name} added as a tentative stop.`, alreadyPlanned: "This place is already in your itinerary.", planCleared: "Your itinerary has been cleared.", dayCleared: "This day has been cleared.", exampleLoaded: "Example itinerary loaded.", storageUnavailable: "This browser cannot save your itinerary, but you can still use it today.", clearConfirm: "Clear every stop from your itinerary?", clearDayConfirm: "Clear every stop from this day?", remove: "Remove", unavailable: "Unavailable to plan",
      mapEyebrow: "Find your way", mapTitle: "A wider Aseer view.", mapCopy: "This illustrated overview helps place the region in context. Open a Maps search when you are ready to navigate.", mapDisclaimer: "Illustrative only — not for navigation", futureKicker: "Aseer, looking forward", futureTitleEnglish: "The Future Is Coming", futureCopy: "A future rooted in mountain memory, made brighter by imagination, care and the next generation of Aseer makers.", futureAction: "Explore Aseer again", footerCopy: "A local-first guide for unhurried days in Abha and Aseer.", footerNote: "Breathe deep. Choose a path.\n© 2026 Breathe Abha", dataError: "The guide data could not be loaded safely. Please check the local project files."
    },
    ar: {
      skip: "انتقل إلى المحتوى", brandHome: "الصفحة الرئيسية لتنفس أبها", primaryNavigation: "التنقل الرئيسي", categoryNavigation: "استكشف فئة أخرى", statusLegendLabel: "مفتاح حالة القوائم", mapImageAlt: "رسم أصلي مستوحى من تراث عسير يجمع الجبال وأغصان الجاكراندا والزخارف الهندسية", mapFeaturedPlaces: "أماكن مختارة في هذا الرسم", futureImageAlt: "رسم أصلي لمستقبل عسير يجمع الجبال وتفاصيل تراثية مضيئة", pageTitleHome: "تنفّس أبها — عسير على مهل", pageTitleBrowse: "استكشف عسير — تنفّس أبها", pageTitlePlanner: "خطط ليومك — تنفّس أبها", pageTitleMap: "دليل المنطقة — تنفّس أبها", pageTitleCategory: name => `${name} — تنفّس أبها`,
      navHome: "الرئيسية", navExplore: "استكشف", navPlanner: "خطط ليومك", navMap: "دليل المنطقة", themeLight: "التبديل إلى الوضع الفاتح", themeDark: "التبديل إلى الوضع الداكن", language: "English",
      tapToEnter: "Tap to enter", tapToEnterArabic: "اضغط للدخول", introStatus: "فيلم الافتتاح جاهز. اضغط للدخول لبدء التشغيل بالصوت.", introPlayingStatus: "يعمل فيلم الافتتاح مع الصوت.", introSoundOnStatus: "الصوت يعمل في فيلم الافتتاح.", introSoundOffStatus: "فيلم الافتتاح صامت.", introUnavailable: "تعذر تشغيل فيلم الافتتاح. صفحة البداية جاهزة.", introDialogLabel: "فيلم افتتاح تنفّس أبها", introControlsLabel: "عناصر التحكم في فيلم الافتتاح", skipIntro: "تخطَّ المقدمة", soundOn: "تشغيل الصوت", muteSound: "كتم الصوت", soundOnLabel: "تشغيل صوت فيلم الافتتاح", muteSoundLabel: "كتم صوت فيلم الافتتاح", homeKicker: "عسير على مهل", homeTitle: "تنفّس في أبها.", homeCopy: "حيث يلتقي الهواء العليل بعمق التراث ودفء الترحيب، فتغدو كل لحظة ذكرى.", exploreAction: "ادخل إلى الدليل",
      browseKicker: "اختر إيقاعك", browseTitle: "وجه من عسير لكل مزاج.", browseCopy: "اختر فئة لفتح أماكنها المختارة وروابط الخرائط وخيارات التخطيط.", categoryExplore: "استكشف الفئة", categoryCount: count => `${count} ${count === 1 ? "مكان" : "أماكن"}`,
      backToCategories: "كل الفئات", categoryOpened: name => `تم اختيار فئة ${name}.`, landingOpened: "تم فتح صفحة تنفّس أبها.", guideOpened: "تم فتح دليل الفئات.", plannerOpened: "تم فتح مخطط اليوم.", mapOpened: "تم فتح دليل المنطقة.",
      coreThemes: "تصفية حسب المحور", searchLabel: "ابحث في هذه الفئة", searchPlaceholder: "ابحث في هذه الفئة", monthLabel: "إرشاد الأنشطة الخارجية في", resultCount: (count, month) => `${count} ${count === 1 ? "مكان" : "أماكن"}${month ? ` في ${month}` : ""}`, bestMonths: "إرشاد الأنشطة الخارجية", noMonthGuidance: "لا يوجد إرشاد شهري", reset: "مسح الفلاتر", addPlan: "أضف للخطة", addTentative: "أضف كمحطة مبدئية", addedPlan: "ضمن خطتك", mapsOpen: "افتح في خرائط Google", mapsSearch: "ابحث في خرائط Google", openMapsFor: name => `افتح ${name} في خرائط Google`, searchMapsFor: name => `ابحث عن ${name} في خرائط Google`,
      verified: "مكان موثق", caveat: "تحقق من الفرع / الموقع", confirmation: "تحقق من تفاصيل المكان", closed: "مغلق مؤقتًا", tentative: "محطة مبدئية", statusLegend: "حالة القائمة", statusHint: "تحقق من تسميات الحالة قبل الزيارة. إنها إرشاد تحريري وليست تحديثًا مباشرًا للتوفر.",
      emptyTitle: "لا توجد أماكن مطابقة بعد.", emptyCopy: "جرّب عبارة أخرى أو امسح الفلاتر لرؤية هذه الفئة.",
      plannerEyebrow: "خطط لإقامتك", plannerTitle: "اصنع برنامجك في عسير.", plannerCopy: "اختر مدة إقامتك، ثم اضغط على بطاقة الفترة لاختيار مكان. تبقى اختياراتك في هذا المتصفح فقط.", plannerNote: "اضغط على بطاقة فترة فارغة لاختيار مكان، أو استبدل أي محطة عندما تتغير خططك.", stayLength: "كم يومًا ستقيم؟", oneDay: "يوم واحد", twoDays: "يومان", threeDays: "3 أيام", customDays: "عدد مخصص", customDaysLabel: "عدد الأيام", customDaysHint: "اختر من يوم إلى 14 يومًا", day: count => `اليوم ${count}`, pickerTarget: (day, slot) => `اليوم ${day} · ${slot}`, placePickerTitle: "اختر مكانًا", placePickerCopy: "اختر مكانًا واحدًا لهذه الفترة في برنامجك.", closePicker: "إغلاق", choosePlace: "اختر هذا المكان", morning: "صباح", noon: "ظهر", evening: "مساء", night: "ليل", emptySlot: "اضغط لاختيار مكان", replaceSlot: "استبدل هذه الفترة", chooseStayLength: "اختر مدة الإقامة لإنشاء برنامجك الفارغ.", videoFor: name => `فيديو ${name}`, videoPlay: "شغّل الفيديو", videoPause: "أوقف الفيديو مؤقتًا", videoPreview: "شغّل المعاينة", videoControls: "عناصر التحكم في الفيديو", videoSoundOn: "شغّل الصوت", videoMute: "اكتم الصوت", videoFullscreen: "عرض بملء الشاشة", videoExitFullscreen: "الخروج من ملء الشاشة", videoFullscreenUnavailable: "لا يتوفر عرض الفيديو بملء الشاشة في هذا المتصفح.", videoMuted: "صوت الفيديو مكتوم.", videoSoundEnabled: "صوت الفيديو يعمل.", videoUnavailable: "تعذر تشغيل هذا الفيديو.", openImage: name => `افتح الصورة الكاملة لـ ${name}`, closeImage: "أغلق عارض الصور", previousImage: "الصورة السابقة", nextImage: "الصورة التالية", imagePosition: (current, total) => `الصورة ${current} من ${total}`, loadExample: "حمّل المثال", clearDay: "امسح اليوم", clearPlan: "امسح الكل", removed: "أُزيلت المحطة من برنامجك.", added: name => `أُضيف ${name} إلى برنامجك.`, replaced: name => `استبدل ${name} المحطة المحددة.`, addedTentative: name => `أُضيف ${name} كمحطة مبدئية.`, alreadyPlanned: "هذا المكان موجود بالفعل في برنامجك.", planCleared: "تم مسح برنامجك.", dayCleared: "تم مسح هذا اليوم.", exampleLoaded: "تم تحميل البرنامج التجريبي.", storageUnavailable: "لا يستطيع هذا المتصفح حفظ برنامجك، لكن يمكنك استخدامه اليوم.", clearConfirm: "هل تريد مسح جميع محطات برنامجك؟", clearDayConfirm: "هل تريد مسح جميع محطات هذا اليوم؟", remove: "إزالة", unavailable: "غير متاح للخطة",
      mapEyebrow: "اعثر على طريقك", mapTitle: "نظرة أوسع إلى عسير.", mapCopy: "يساعد الرسم التوضيحي على وضع المنطقة في سياقها. افتح بحث الخرائط عندما تكون مستعدًا للتنقل.", mapDisclaimer: "رسم توضيحي فقط — ليس للملاحة", futureKicker: "عسير تتطلع إلى الأمام", futureTitleEnglish: "The Future Is Coming", futureCopy: "مستقبل متجذّر في ذاكرة الجبال، يزداد إشراقًا بالخيال والعناية وجيل عسير القادم من الصنّاع.", futureAction: "استكشف عسير من جديد", footerCopy: "دليل محلي أولًا لأيام هادئة في أبها وعسير.", footerNote: "تنفّس بعمق واختر طريقك.\n© 2026 تنفّس أبها", dataError: "تعذر تحميل بيانات الدليل بأمان. يرجى التحقق من ملفات المشروع المحلية."
    }
  };

  const elements = {
    html: document.documentElement,
    title: document.querySelector("title"),
    themeToggle: document.querySelector("#theme-toggle"),
    languageToggle: document.querySelector("#language-toggle"),
    appError: document.querySelector("#app-error"),
    announcement: document.querySelector("#route-announcement"),
    intro: document.querySelector("#intro-film"),
    introVideo: document.querySelector("#intro-video"),
    introStart: document.querySelector("#intro-start"),
    introControls: document.querySelector("#intro-controls"),
    introStatus: document.querySelector("#intro-status"),
    skipIntro: document.querySelector("#skip-intro"),
    introSound: document.querySelector("#intro-sound"),
    introSoundLabel: document.querySelector("[data-intro-sound-label]"),
    landingPetals: document.querySelector("#landing-petals"),
    pagePetals: document.querySelector("#page-petal-transition"),
    landing: document.querySelector("#home"),
    guideIndex: document.querySelector("#guide-index"),
    browseTitle: document.querySelector("#browse-title"),
    categoryHub: document.querySelector("#category-hub"),
    categoryDetail: document.querySelector("#category-detail"),
    detailNav: document.querySelector("#detail-category-nav"),
    categoryContext: document.querySelector("#category-context"),
    categoryBack: document.querySelector("#category-back"),
    search: document.querySelector("#category-search"),
    month: document.querySelector("#month-picker"),
    resultStatus: document.querySelector("#results-status"),
    grid: document.querySelector("#place-grid"),
    empty: document.querySelector("#empty-state"),
    reset: document.querySelector("#reset-filters"),
    legend: document.querySelector("#status-legend"),
    stayLengthOptions: document.querySelector("#stay-length-options"),
    customDaysField: document.querySelector("#custom-days-field"),
    customDays: document.querySelector("#custom-days"),
    planSlots: document.querySelector("#plan-slots"),
    plannerStatus: document.querySelector("#planner-status"),
    placePicker: document.querySelector("#place-picker"),
    placePickerTarget: document.querySelector("#place-picker-target"),
    placePickerList: document.querySelector("#place-picker-list"),
    placePickerClose: document.querySelector("#place-picker-close"),
    loadExample: document.querySelector("#load-example"),
    clearPlan: document.querySelector("#clear-plan"),
    locations: document.querySelector("#location-list"),
    mapPlaceOverlay: document.querySelector("#map-place-overlay"),
    brandNames: [...document.querySelectorAll("#brand-name, #footer-brand-name")],
    routeLinks: [...document.querySelectorAll("[data-route-link]")],
    lightboxDialog: document.querySelector("#media-lightbox"),
    lightboxImage: document.querySelector("#lightbox-image"),
    lightboxTitle: document.querySelector("#lightbox-title"),
    lightboxPosition: document.querySelector("#lightbox-position"),
    lightboxClose: document.querySelector("#lightbox-close"),
    lightboxPrevious: document.querySelector("#lightbox-previous"),
    lightboxNext: document.querySelector("#lightbox-next"),
    scrollProgress: document.querySelector("#scroll-progress-fill")
  };

  const currentMonth = () => new Date().toISOString().slice(0, 7);
  const safeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
  const isValidPlace = id => data?.places?.some(place => place.id === id && place.plannerMode !== "unavailable");
  const placeById = id => data.places.find(place => place.id === id);
  const t = key => ui[state.locale][key] ?? key;
  const nameOf = place => place.name[state.locale];
  const areaOf = place => place.area[state.locale];
  const placeImages = place => Array.isArray(place.images) && place.images.length ? place.images : place.image ? [place.image] : [];
  const statusOf = place => place.operation === "closed" ? "closed" : place.verification;
  const mapUrl = place => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;
  const mapsNeedsSearch = place => ["multiple", "area", "confirmation"].includes(place.precision);
  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  function blankDay() { return Object.fromEntries(slots.map(slot => [slot, ""])); }
  function normalizeDays(dayCount, days) {
    const count = Math.min(maxPlannerDays, Math.max(0, Number(dayCount) || 0));
    return Array.from({ length: count }, (_, index) => slots.reduce((day, slot) => {
      const id = days?.[index]?.[slot];
      day[slot] = isValidPlace(id) ? id : "";
      return day;
    }, {}));
  }
  function plannedIds(days = state?.days || []) { return days.flatMap(day => slots.map(slot => day[slot]).filter(Boolean)); }

  function validateGuideData() {
    if (!data || !Array.isArray(data.collections) || !Array.isArray(data.places) || !data.coreCategories) return false;
    const collectionIds = new Set();
    const placeIds = new Set();
    if (data.collections.length !== 10) return false;
    for (const collection of data.collections) {
      if (!/^[a-z0-9-]+$/.test(collection.id || "") || collectionIds.has(collection.id) || !collection.en || !collection.ar || !collection.intro?.en || !collection.intro?.ar || !/^assets\/placeholders\/[a-z0-9-]+\.svg$/.test(collection.artwork || "")) return false;
      if (collection.coverPlaceId !== undefined && !/^[a-z0-9-]+$/.test(collection.coverPlaceId || "")) return false;
      collectionIds.add(collection.id);
    }
    for (const place of data.places) {
      if (!/^[a-z0-9-]+$/.test(place.id || "") || placeIds.has(place.id) || !place.name?.en || !place.name?.ar || !place.area?.en || !place.area?.ar || !place.summary?.en || !place.summary?.ar || !place.note?.en || !place.note?.ar || !place.mapQuery) return false;
      if (!Array.isArray(place.aliases) || !Array.isArray(place.coreCategories) || !Array.isArray(place.lifestyleCategories) || !Array.isArray(place.bestMonths)) return false;
      if (place.coreCategories.some(key => !coreKeys.includes(key)) || place.lifestyleCategories.some(key => !collectionIds.has(key))) return false;
      if (!precisionKeys.includes(place.precision) || !verificationKeys.includes(place.verification) || !operationKeys.includes(place.operation) || !plannerKeys.includes(place.plannerMode)) return false;
      if (place.bestMonths.some(month => !/^(0[1-9]|1[0-2])$/.test(month))) return false;
      const manifest = allowedMedia[place.id] || {};
      const images = placeImages(place);
      if (manifest.image !== place.image?.src || (place.image && (!mediaImagePattern.test(place.image.src) || !place.image.alt?.en || !place.image.alt?.ar))) return false;
      if (place.images !== undefined && (!Array.isArray(place.images) || !place.images.length || images.some(image => !mediaImagePattern.test(image?.src || "") || !image.alt?.en || !image.alt?.ar) || new Set(images.map(image => image.src)).size !== images.length || !images.some(image => image.src === manifest.image))) return false;
      if (manifest.video !== place.video?.src || manifest.poster !== place.video?.poster || (place.video && (!mediaVideoPattern.test(place.video.src) || !mediaImagePattern.test(place.video.poster)))) return false;
      placeIds.add(place.id);
    }
    if (data.collections.some(collection => !data.places.some(place => place.lifestyleCategories.includes(collection.id)))) return false;
    if (data.collections.some(collection => collection.coverPlaceId && (!placeById(collection.coverPlaceId)?.lifestyleCategories.includes(collection.id) || !allowedMedia[collection.coverPlaceId]?.image || !placeById(collection.coverPlaceId)?.image))) return false;
    if (!['al-soudah', 'rijal-almaa', 'shamsan-castle', 'al-faraa'].every(id => placeById(id)?.lifestyleCategories.includes('nature'))) return false;
    const example = data.exampleItinerary;
    return Number.isInteger(example?.dayCount) && example.dayCount > 0 && Array.isArray(example.days) && example.days.length === example.dayCount && example.days.every(day => slots.every(slot => !day[slot] || (placeIds.has(day[slot]) && placeById(day[slot]).plannerMode !== 'unavailable')));
  }

  function readPlan(key) {
    try {
      const parsed = JSON.parse(safeGet(key) || "null");
      if (!parsed || typeof parsed !== "object") return null;
      if (Array.isArray(parsed.days)) {
        const hasChosenDayCount = parsed.hasChosenDayCount !== false;
        const storedCount = Math.min(maxPlannerDays, Math.max(1, Number(parsed.dayCount) || parsed.days.length || 1));
        const dayCount = hasChosenDayCount ? storedCount : 0;
        return {
          month: /^\d{4}-(0[1-9]|1[0-2])$/.test(parsed.month || "") ? parsed.month : currentMonth(),
          dayCount,
          days: normalizeDays(dayCount, parsed.days),
          hasChosenDayCount,
          dayLengthMode: parsed.dayLengthMode === "custom" ? "custom" : "preset"
        };
      }
      if (parsed.plan && typeof parsed.plan === "object") {
        const legacyDay = { morning: parsed.plan.morning, noon: parsed.plan.noon || parsed.plan.lunch, evening: parsed.plan.evening, night: "" };
        return {
          month: /^\d{4}-(0[1-9]|1[0-2])$/.test(parsed.month || "") ? parsed.month : currentMonth(),
          dayCount: 1,
          days: normalizeDays(1, [legacyDay]),
          hasChosenDayCount: true,
          dayLengthMode: "preset"
        };
      }
      return null;
    } catch { return null; }
  }

  const savedPlanner = readPlan(STORAGE.planner) || readPlan(STORAGE.legacyPlanner) || readPlan(STORAGE.olderPlanner) || { month: currentMonth(), dayCount: 0, days: [], hasChosenDayCount: false, dayLengthMode: "preset" };
  const savedLocale = safeGet(STORAGE.locale);
  const storedTheme = safeGet(STORAGE.theme);
  const browserLocale = navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
  const state = {
    locale: savedLocale === "ar" || savedLocale === "en" ? savedLocale : browserLocale,
    theme: storedTheme === "dark" || storedTheme === "light" ? storedTheme : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    activeCategory: null,
    query: "",
    month: savedPlanner.month,
    dayCount: savedPlanner.dayCount,
    days: savedPlanner.days,
    pickerTarget: null,
    pickerReturnFocus: null,
    hasChosenDayCount: savedPlanner.hasChosenDayCount,
    dayLengthMode: savedPlanner.dayLengthMode,
    searchTimer: null,
    introDismissed: false,
    introExitTimer: null,
    introStatus: "default",
    introSoundOn: false,
    introPhase: "idle",
    introReturnFocus: null,
    pagePetalTimer: null,
    pagePetalToken: 0,
    landingPetalToken: 0,
    scrollFrame: null,
    progressFrame: null,
    sectionFrame: null,
    routeIntent: null,
    previousRouteKey: null,
    lightbox: { place: null, images: [], index: 0, trigger: null }
  };

  const icon = type => ({
    plus: "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 5v14M5 12h14\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.8\"/></svg>",
    pin: "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 21s6-5.05 6-11A6 6 0 1 0 6 10c0 5.95 6 11 6 11Z\" fill=\"none\" stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"1.7\"/><circle cx=\"12\" cy=\"10\" r=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg>",
    trash: "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m-9 0 1 13h10l1-13\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\"/></svg>",
    check: "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m5 12 4.2 4.2L19 6.7\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/></svg>",
    alert: "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 3 2.8 20h18.4L12 3Zm0 6v4m0 3h.01\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.8\"/></svg>",
    arrow: "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14m-6-6 6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.8\"/></svg>"
  })[type];

  function setPlannerStatus(message) { elements.plannerStatus.textContent = message; }
  function persistPlan() { if (!safeSet(STORAGE.planner, JSON.stringify({ month: state.month, dayCount: state.dayCount, days: state.days, hasChosenDayCount: state.hasChosenDayCount, dayLengthMode: state.dayLengthMode }))) setPlannerStatus(t("storageUnavailable")); }
  function formatMonth(value) {
    if (!/^\d{4}-\d{2}$/.test(value)) return t("thisMonth");
    const [year, month] = value.split("-").map(Number);
    return new Intl.DateTimeFormat(state.locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
  }
  function bestMonths(place) {
    if (!place.bestMonths.length) return t("noMonthGuidance");
    const formatter = new Intl.DateTimeFormat(state.locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", { month: "short" });
    return place.bestMonths.map(month => formatter.format(new Date(2026, Number(month) - 1, 1))).join(" · ");
  }
  function statusIcon(status) { return status === "verified" ? icon("check") : icon("alert"); }

  function createStatusBadge(place, compact = false) {
    const status = statusOf(place);
    const badge = document.createElement("span");
    badge.className = `status-badge status-${status}${compact ? " is-compact" : ""}`;
    badge.innerHTML = `${statusIcon(status)}<span>${t(status)}</span>`;
    return badge;
  }

  function setTheme() {
    elements.html.dataset.theme = state.theme;
    const isDark = state.theme === "dark";
    elements.themeToggle.setAttribute("aria-label", isDark ? t("themeLight") : t("themeDark"));
    elements.themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  function setBrand() {
    const brand = state.locale === "ar"
      ? "تنفّس <span class=\"brand-city\">أبها</span>"
      : "Breathe <span class=\"brand-city\">Abha</span>";
    elements.brandNames.forEach(node => { node.innerHTML = brand; });
  }

  function renderPetals(container, count, transition = false) {
    if (!container) return;
    const petals = Array.from({ length: count }, (_, index) => {
      const petal = document.createElement("i");
      petal.style.setProperty("--petal-x", `${(index * 37 + 7) % 101}%`);
      petal.style.setProperty("--petal-y", `${-22 - ((index * 19) % 58)}px`);
      petal.style.setProperty("--petal-size", `${transition ? 7 + (index % 3) * 2 : 7 + (index % 4) * 2}px`);
      petal.style.setProperty("--petal-delay", `${transition ? (index % 4) * .24 : (index % 6) * 1.18 + Math.floor(index / 6) * .52}s`);
      petal.style.setProperty("--petal-duration", `${transition ? 2.25 + (index % 4) * .18 : 13.6 + (index % 5) * 1.35}s`);
      petal.style.setProperty("--petal-drift", `${-52 + (index % 7) * 17}px`);
      petal.style.setProperty("--petal-tilt", `${(index * 29) % 120}deg`);
      petal.style.setProperty("--petal-opacity", `${transition ? .2 + (index % 3) * .06 : .18 + (index % 4) * .055}`);
      return petal;
    });
    container.replaceChildren(...petals);
  }

  function playLandingPetals() {
    if (reducedMotion() || !elements.landingPetals) return;
    const token = ++state.landingPetalToken;
    renderPetals(elements.landingPetals, 14);
    requestAnimationFrame(() => {
      if (token === state.landingPetalToken) elements.landingPetals.classList.add("is-active");
    });
  }

  function setIntroSound(enabled, { announce = true } = {}) {
    state.introSoundOn = enabled;
    elements.introVideo.muted = !enabled;
    elements.introSound.setAttribute("aria-pressed", String(enabled));
    elements.introSound.setAttribute("data-i18n-aria-label", enabled ? "muteSoundLabel" : "soundOnLabel");
    elements.introSound.setAttribute("aria-label", t(enabled ? "muteSoundLabel" : "soundOnLabel"));
    elements.introSoundLabel.textContent = t(enabled ? "muteSound" : "soundOn");
    if (announce && !elements.intro.hidden) {
      state.introStatus = enabled ? "sound-on" : "sound-off";
      elements.introStatus.textContent = t(enabled ? "introSoundOnStatus" : "introSoundOffStatus");
    }
  }

  function applyTranslations() {
    elements.html.lang = state.locale;
    elements.html.dir = state.locale === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => { node.placeholder = t(node.dataset.i18nPlaceholder); });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(node => { node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel)); });
    document.querySelectorAll("[data-i18n-alt]").forEach(node => { node.alt = t(node.dataset.i18nAlt); });
    elements.languageToggle.setAttribute("aria-label", state.locale === "ar" ? "Switch to English" : "التبديل إلى العربية");
    elements.languageToggle.querySelector(".language-label").textContent = t("language");
    elements.languageToggle.querySelector("span:first-child").textContent = state.locale === "ar" ? "EN" : "ع";
    setBrand();
    if (elements.intro && !elements.intro.hidden) {
      const statusKey = {
        playing: "introPlayingStatus",
        unavailable: "introUnavailable",
        "sound-on": "introSoundOnStatus",
        "sound-off": "introSoundOffStatus"
      }[state.introStatus] || "introStatus";
      elements.introStatus.textContent = t(statusKey);
      elements.introSound.setAttribute("aria-label", t(state.introSoundOn ? "muteSoundLabel" : "soundOnLabel"));
      elements.introSoundLabel.textContent = t(state.introSoundOn ? "muteSound" : "soundOn");
    }
    setTheme();
  }

  function renderLightbox() {
    const { place, images, index } = state.lightbox;
    if (!place || !images.length || !elements.lightboxDialog.open) return;
    const image = images[index];
    const hasMultiple = images.length > 1;
    elements.lightboxImage.src = image.src;
    elements.lightboxImage.alt = image.alt[state.locale];
    elements.lightboxTitle.textContent = nameOf(place);
    elements.lightboxPosition.textContent = hasMultiple ? t("imagePosition")(index + 1, images.length) : "";
    elements.lightboxPrevious.hidden = !hasMultiple;
    elements.lightboxNext.hidden = !hasMultiple;
    elements.lightboxPrevious.setAttribute("aria-label", t("previousImage"));
    elements.lightboxNext.setAttribute("aria-label", t("nextImage"));
    elements.lightboxClose.setAttribute("aria-label", t("closeImage"));
    elements.lightboxClose.textContent = t("closeImage");
  }

  function closeLightbox({ restoreFocus = true } = {}) {
    const { trigger } = state.lightbox;
    if (elements.lightboxDialog.open) elements.lightboxDialog.close();
    state.lightbox = { place: null, images: [], index: 0, trigger: null };
    if (restoreFocus && trigger?.isConnected) requestAnimationFrame(() => trigger.focus({ preventScroll: true }));
  }

  function openLightbox(place, trigger) {
    const images = placeImages(place);
    if (!images.length) return;
    if (elements.lightboxDialog.open) closeLightbox({ restoreFocus: false });
    state.lightbox = { place, images, index: 0, trigger };
    elements.lightboxDialog.showModal();
    renderLightbox();
    requestAnimationFrame(() => elements.lightboxClose.focus({ preventScroll: true }));
  }

  function stepLightbox(direction) {
    const { images } = state.lightbox;
    if (images.length < 2) return;
    state.lightbox.index = (state.lightbox.index + direction + images.length) % images.length;
    renderLightbox();
  }

  function collectionById(id) { return data.collections.find(collection => collection.id === id); }
  function parseRoute() {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw || raw === "home" || raw === "top" || raw === "places" || raw === "lifestyle") return { target: "home", categoryId: null, legacy: false };
    if (raw === "planner" || raw === "home/planner") return { target: "planner", categoryId: null, legacy: raw !== "planner" };
    if (raw === "map" || raw === "home/map") return { target: "map", categoryId: null, legacy: raw !== "map" };
    const browseMatch = raw.match(/^browse\/([a-z0-9-]+)$/);
    if (browseMatch && collectionById(browseMatch[1])) return { target: "category", categoryId: browseMatch[1], legacy: false };
    const legacyMatch = raw.match(/^category\/([a-z0-9-]+)$/);
    if (legacyMatch && collectionById(legacyMatch[1])) return { target: "category", categoryId: legacyMatch[1], legacy: true };
    if (raw === "browse") return { target: "browse", categoryId: null, legacy: false };
    return { target: "home", categoryId: null, legacy: true };
  }

  function matchingPlaces(categoryId = state.activeCategory) {
    const query = state.query.trim().toLocaleLowerCase();
    return data.places.filter(place => {
      const searchable = [place.name.en, place.name.ar, ...place.aliases, place.summary.en, place.summary.ar, place.area.en, place.area.ar, place.note.en, place.note.ar].join(" ").toLocaleLowerCase();
      const categoryMatch = !categoryId || place.lifestyleCategories.includes(categoryId);
      const queryMatch = !query || searchable.includes(query);
      return categoryMatch && queryMatch;
    });
  }

  function renderLegend() {
    elements.legend.replaceChildren();
    const heading = document.createElement("strong"); heading.textContent = t("statusLegend"); elements.legend.append(heading);
    ["verified", "caveat", "confirmation", "closed"].forEach(status => {
      const item = document.createElement("span"); item.className = `status-badge status-${status} is-compact`; item.innerHTML = `${statusIcon(status)}<span>${t(status)}</span>`; elements.legend.append(item);
    });
    const hint = document.createElement("p"); hint.textContent = t("statusHint"); elements.legend.append(hint);
  }

  function createPickerPlace(place) {
    const item = document.createElement("article"); item.className = "place-picker-item";
    const copy = document.createElement("div"); copy.className = "place-picker-item-copy";
    const name = document.createElement("strong"); name.textContent = nameOf(place);
    const area = document.createElement("span"); area.textContent = areaOf(place);
    copy.append(name, area);
    if (place.plannerMode === "tentative") { const tentative = document.createElement("span"); tentative.className = "slot-status"; tentative.textContent = t("tentative"); copy.append(tentative); }
    const actions = document.createElement("div"); actions.className = "place-picker-item-actions";
    const alreadyPlanned = plannedIds().includes(place.id);
    const unavailable = place.plannerMode === "unavailable";
    const choose = document.createElement("button"); choose.type = "button"; choose.className = "small-button";
    choose.textContent = unavailable ? t("unavailable") : alreadyPlanned ? t("alreadyPlanned") : t("choosePlace");
    choose.disabled = unavailable || alreadyPlanned;
    if (unavailable) choose.title = t("closed");
    if (alreadyPlanned) choose.title = t("alreadyPlanned");
    if (!choose.disabled) choose.addEventListener("click", () => addPlace(place.id));
    const map = document.createElement("a"); map.className = "map-link"; map.href = mapUrl(place); map.target = "_blank"; map.rel = "noopener noreferrer";
    const search = mapsNeedsSearch(place); map.setAttribute("aria-label", (search ? t("searchMapsFor") : t("openMapsFor"))(nameOf(place))); map.innerHTML = `${icon("pin")}<span>${search ? t("mapsSearch") : t("mapsOpen")}</span>`;
    actions.append(choose, map); item.append(copy, actions); return item;
  }

  function renderPlacePicker() {
    const target = state.pickerTarget;
    if (!target) return;
    elements.placePickerTarget.textContent = t("pickerTarget")(target.dayIndex + 1, t(target.slot));
    elements.placePickerList.replaceChildren(...data.places.map(createPickerPlace));
  }

  function closePlacePicker({ restoreFocus = true } = {}) {
    const trigger = state.pickerReturnFocus;
    if (elements.placePicker.open) elements.placePicker.close();
    state.pickerTarget = null; state.pickerReturnFocus = null;
    if (restoreFocus && trigger?.isConnected) requestAnimationFrame(() => trigger.focus({ preventScroll: true }));
  }

  function openPlacePicker(dayIndex, slot, trigger) {
    if (!state.days[dayIndex] || !slots.includes(slot)) return;
    state.pickerTarget = { dayIndex, slot }; state.pickerReturnFocus = trigger;
    renderPlacePicker();
    elements.placePicker.showModal();
    requestAnimationFrame(() => elements.placePickerClose.focus({ preventScroll: true }));
  }

  function focusPlannerSlot(dayIndex, slot) {
    requestAnimationFrame(() => elements.planSlots.querySelector(`[data-picker-day="${dayIndex}"][data-picker-slot="${slot}"]`)?.focus({ preventScroll: true }));
  }

  function createPlaceVideo(place) {
    const wrapper = document.createElement("div"); wrapper.className = "place-video";
    const video = document.createElement("video"); video.src = place.video.src; video.poster = place.video.poster; video.muted = true; video.playsInline = true; video.preload = "metadata";
    video.setAttribute("aria-label", t("videoFor")(nameOf(place)));
    const controls = document.createElement("div"); controls.className = "place-video-controls"; controls.setAttribute("role", "group"); controls.setAttribute("aria-label", t("videoControls"));
    const play = document.createElement("button"); play.type = "button"; play.className = "place-video-button";
    const sound = document.createElement("button"); sound.type = "button"; sound.className = "place-video-button";
    const fullscreen = document.createElement("button"); fullscreen.type = "button"; fullscreen.className = "place-video-button";
    const status = document.createElement("span"); status.className = "sr-only"; status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
    let hoverStarted = false;
    let visitorStarted = false;
    const canHover = () => matchMedia("(hover: hover) and (pointer: fine)").matches && !reducedMotion();
    const isFullscreen = () => Boolean(document.fullscreenElement || document.webkitFullscreenElement || video.webkitDisplayingFullscreen);
    const setPlayState = () => {
      const isPlaying = !video.paused && !video.ended;
      play.textContent = isPlaying ? t("videoPause") : t("videoPlay");
      play.setAttribute("aria-pressed", String(isPlaying));
    };
    const setSoundState = () => { sound.textContent = video.muted ? t("videoSoundOn") : t("videoMute"); sound.setAttribute("aria-pressed", String(!video.muted)); };
    const setFullscreenState = () => { const active = isFullscreen(); fullscreen.textContent = active ? t("videoExitFullscreen") : t("videoFullscreen"); fullscreen.setAttribute("aria-pressed", String(active)); };
    const startPlayback = ({ visitor = false } = {}) => {
      if (visitor) { visitorStarted = true; hoverStarted = false; }
      else { hoverStarted = true; video.muted = true; }
      video.muted = visitor ? video.muted : true;
      setSoundState();
      const attempt = video.play();
      if (attempt?.catch) attempt.catch(() => {
        if (!visitor) { hoverStarted = false; return; }
        visitorStarted = false;
        status.textContent = t("videoUnavailable"); setPlayState();
      });
    };
    const stopHoverPreview = () => {
      if (!hoverStarted || visitorStarted) return;
      hoverStarted = false;
      video.pause();
      video.currentTime = 0;
      setPlayState();
    };
    const toggleFullscreen = () => {
      if (isFullscreen()) {
        if (document.exitFullscreen) { const result = document.exitFullscreen(); if (result?.catch) result.catch(() => { status.textContent = t("videoFullscreenUnavailable"); }); return; }
        if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); return; }
      }
      if (wrapper.requestFullscreen) { const result = wrapper.requestFullscreen(); if (result?.catch) result.catch(() => { status.textContent = t("videoFullscreenUnavailable"); }); return; }
      if (wrapper.webkitRequestFullscreen) { wrapper.webkitRequestFullscreen(); return; }
      if (video.webkitEnterFullscreen) { video.webkitEnterFullscreen(); return; }
      status.textContent = t("videoFullscreenUnavailable");
    };
    setPlayState(); setSoundState(); setFullscreenState();
    play.addEventListener("click", () => {
      if (video.paused || video.ended) startPlayback({ visitor: true });
      else { visitorStarted = true; hoverStarted = false; video.pause(); }
    });
    sound.addEventListener("click", () => { video.muted = !video.muted; setSoundState(); status.textContent = video.muted ? t("videoMuted") : t("videoSoundEnabled"); });
    fullscreen.addEventListener("click", toggleFullscreen);
    wrapper.addEventListener("pointerenter", () => { if (canHover() && video.paused) { hoverStarted = true; startPlayback(); } });
    wrapper.addEventListener("pointerleave", stopHoverPreview);
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopHoverPreview(); });
    video.addEventListener("play", setPlayState); video.addEventListener("pause", setPlayState); video.addEventListener("ended", () => { hoverStarted = false; setPlayState(); });
    document.addEventListener("fullscreenchange", setFullscreenState); document.addEventListener("webkitfullscreenchange", setFullscreenState); video.addEventListener("webkitbeginfullscreen", setFullscreenState); video.addEventListener("webkitendfullscreen", setFullscreenState);
    video.addEventListener("error", () => { play.disabled = true; sound.disabled = true; fullscreen.disabled = true; status.textContent = t("videoUnavailable"); });
    controls.append(play, sound, fullscreen); wrapper.append(video, controls, status); return wrapper;
  }

  function createPlaceCard(place) {
    const card = document.createElement("article"); card.className = `place-card${place.image || place.video ? " has-photo" : ""}${place.video ? " place-card--video" : ""}`;
    if (place.coreCategories.includes("heritage")) card.dataset.coreTheme = "heritage";
    const scene = document.createElement("div"); scene.className = `place-scene visual-${place.visual}`;
    if (place.video) scene.append(createPlaceVideo(place));
    else if (placeImages(place).length) {
      const trigger = document.createElement("button"); trigger.type = "button"; trigger.className = "place-image-trigger"; trigger.setAttribute("aria-label", t("openImage")(nameOf(place)));
      const image = document.createElement("img"); image.src = placeImages(place)[0].src; image.alt = placeImages(place)[0].alt[state.locale]; image.loading = "lazy"; image.decoding = "async";
      const label = document.createElement("span"); label.className = "place-image-label"; label.textContent = nameOf(place);
      trigger.append(image, label); trigger.addEventListener("click", () => openLightbox(place, trigger)); scene.append(trigger);
    } else {
      scene.setAttribute("aria-hidden", "true");
      const visualLine = document.createElement("div"); visualLine.className = "scene-line"; scene.append(visualLine);
    }
    const content = document.createElement("div"); content.className = "place-card-content";
    const top = document.createElement("div"); top.className = "card-topline";
    const area = document.createElement("p"); area.className = "card-area"; area.textContent = areaOf(place); top.append(area, createStatusBadge(place, true));
    const title = document.createElement("h3"); title.textContent = nameOf(place);
    const summary = document.createElement("p"); summary.className = "card-summary"; summary.textContent = place.summary[state.locale];
    const note = document.createElement("p"); note.className = "verification-note"; note.textContent = place.note[state.locale];
    const meta = document.createElement("div"); meta.className = "card-meta";
    const month = document.createElement("span"); month.className = "best-months";
    const monthTitle = document.createElement("strong"); monthTitle.textContent = t("bestMonths");
    const monthContent = document.createElement("span"); monthContent.textContent = bestMonths(place); month.append(monthTitle, monthContent); meta.append(month);
    const actions = document.createElement("div"); actions.className = "card-actions";
    const link = document.createElement("a"); link.className = "map-link"; link.href = mapUrl(place); link.target = "_blank"; link.rel = "noopener noreferrer";
    const search = mapsNeedsSearch(place); link.setAttribute("aria-label", (search ? t("searchMapsFor") : t("openMapsFor"))(nameOf(place))); link.innerHTML = `${icon("pin")}<span>${search ? t("mapsSearch") : t("mapsOpen")}</span>`; actions.append(link);
    content.append(top, title, summary, note, meta, actions); card.append(scene, content);
    return card;
  }

  function createCategoryLink(collection, compact = false) {
    const count = data.places.filter(place => place.lifestyleCategories.includes(collection.id)).length;
    const link = document.createElement("a");
    link.href = `#browse/${collection.id}`;
    link.dataset.categoryId = collection.id;
    if (compact) {
      link.className = "detail-category-link";
      link.textContent = collection[state.locale];
      if (state.activeCategory === collection.id) link.setAttribute("aria-current", "page");
    } else {
      link.className = "category-hub-card";
      const coverPlace = placeById(collection.coverPlaceId);
      const coverImage = coverPlace && placeImages(coverPlace)[0];
      const hasVerifiedCover = Boolean(coverImage && allowedMedia[coverPlace.id]?.image === coverImage.src);
      const media = document.createElement("div"); media.className = "category-hub-media";
      const image = document.createElement("img"); image.src = hasVerifiedCover ? coverImage.src : collection.artwork; image.alt = ""; image.loading = "lazy"; image.decoding = "async"; media.append(image);
      if (hasVerifiedCover) { const label = document.createElement("span"); label.className = "category-cover-label"; label.textContent = nameOf(coverPlace); media.append(label); }
      const content = document.createElement("div"); content.className = "category-hub-content";
      const total = document.createElement("span"); total.className = "category-hub-count"; total.textContent = t("categoryCount")(count);
      const title = document.createElement("h3"); title.textContent = collection[state.locale];
      const intro = document.createElement("p"); intro.textContent = collection.intro[state.locale];
      const action = document.createElement("span"); action.className = "category-hub-action"; action.innerHTML = `<span>${t("categoryExplore")}</span>${icon("arrow")}`;
      content.append(total, title, intro, action); link.append(media, content);
    }
    link.addEventListener("click", event => {
      navigateToHash(event, link.getAttribute("href"), { focus: event.detail === 0 });
    });
    return link;
  }

  function renderCategoryHub() {
    elements.categoryHub.replaceChildren();
    data.collections.forEach(collection => elements.categoryHub.append(createCategoryLink(collection)));
  }

  function renderDetailNavigation() {
    elements.detailNav.replaceChildren();
    data.collections.forEach(collection => elements.detailNav.append(createCategoryLink(collection, true)));
  }

  function renderCategoryDetail({ announce = false } = {}) {
    if (!state.activeCategory) return;
    elements.grid.querySelectorAll("video").forEach(video => { video.pause(); video.removeAttribute("src"); video.load(); });
    const collection = collectionById(state.activeCategory);
    if (!collection) return;
    elements.categoryDetail.dataset.categoryId = collection.id;
    elements.categoryDetail.dataset.categoryVisual = collection.visual;
    elements.categoryContext.replaceChildren();
    const visual = document.createElement("img"); visual.className = "category-context-art"; visual.src = collection.artwork; visual.alt = "";
    const copy = document.createElement("div"); copy.className = "category-context-copy";
    const kicker = document.createElement("span"); kicker.className = "category-hero-kicker"; kicker.textContent = collection[state.locale];
    const title = document.createElement("h2"); title.id = "active-category-title"; title.tabIndex = -1; title.textContent = collection[state.locale];
    const intro = document.createElement("p"); intro.textContent = collection.intro[state.locale];
    const count = document.createElement("span"); count.className = "category-count"; count.textContent = t("categoryCount")(data.places.filter(place => place.lifestyleCategories.includes(collection.id)).length);
    copy.append(kicker, title, intro, count); elements.categoryContext.append(visual, copy);
    elements.search.value = state.query; elements.month.value = state.month;
    renderDetailNavigation(); renderLegend();
    const places = matchingPlaces();
    elements.resultStatus.textContent = t("resultCount")(places.length, state.month ? formatMonth(state.month) : "");
    elements.grid.replaceChildren(); elements.empty.classList.toggle("hidden", places.length !== 0);
    places.forEach(place => elements.grid.append(createPlaceCard(place)));
    if (announce) elements.announcement.textContent = t("categoryOpened")(collection[state.locale]);
  }

  function makePlannerButton(label, value) {
    const button = document.createElement("button"); button.type = "button"; button.className = "stay-length-button"; button.dataset.days = String(value); button.textContent = label;
    button.setAttribute("aria-pressed", String(state.hasChosenDayCount && state.dayLengthMode === "preset" && state.dayCount === value));
    button.addEventListener("click", () => setDayCount(value, "preset")); return button;
  }

  function renderPlanner() {
    elements.stayLengthOptions.replaceChildren(makePlannerButton(t("oneDay"), 1), makePlannerButton(t("twoDays"), 2), makePlannerButton(t("threeDays"), 3));
    const custom = document.createElement("button"); custom.type = "button"; custom.className = "stay-length-button"; custom.textContent = t("customDays"); custom.setAttribute("aria-pressed", String(state.hasChosenDayCount && state.dayLengthMode === "custom"));
    custom.addEventListener("click", () => { state.dayLengthMode = "custom"; elements.customDaysField.hidden = false; elements.customDays.value = String(state.dayCount || 1); persistPlan(); elements.customDays.focus(); }); elements.stayLengthOptions.append(custom);
    elements.customDaysField.hidden = state.dayLengthMode !== "custom";
    elements.customDays.value = String(state.dayCount || 1);
    elements.planSlots.replaceChildren();
    if (!state.hasChosenDayCount) { setPlannerStatus(t("chooseStayLength")); return; }
    state.days.forEach((day, dayIndex) => {
      const group = document.createElement("section"); group.className = "plan-day"; group.setAttribute("aria-label", t("day")(dayIndex + 1));
      const header = document.createElement("header"); header.className = "plan-day-header"; const heading = document.createElement("h3"); heading.textContent = t("day")(dayIndex + 1);
      const clear = document.createElement("button"); clear.type = "button"; clear.className = "text-button"; clear.textContent = t("clearDay"); clear.addEventListener("click", () => clearDay(dayIndex)); header.append(heading, clear); group.append(header);
      const rows = document.createElement("div"); rows.className = "plan-day-slots";
      slots.forEach(slot => {
        const place = placeById(day[slot]); const row = document.createElement("div"); row.className = "plan-slot";
        const labelNode = document.createElement("span"); labelNode.className = "slot-label"; labelNode.textContent = t(slot);
        const content = document.createElement("div"); content.className = "slot-place";
        const choose = document.createElement("button"); choose.type = "button"; choose.className = "slot-choice"; choose.dataset.pickerDay = String(dayIndex); choose.dataset.pickerSlot = slot;
        if (place) {
          const title = document.createElement("strong"); title.textContent = nameOf(place); const area = document.createElement("span"); area.textContent = areaOf(place); choose.append(title, area);
          if (place.plannerMode === "tentative") { const tentative = document.createElement("span"); tentative.className = "slot-status"; tentative.textContent = t("tentative"); choose.append(tentative); }
          choose.setAttribute("aria-label", `${t("replaceSlot")}: ${t(slot)}, ${nameOf(place)}`);
        } else { choose.classList.add("slot-empty"); choose.textContent = t("emptySlot"); choose.setAttribute("aria-label", `${t("choosePlace")}: ${t(slot)}`); }
        choose.addEventListener("click", () => openPlacePicker(dayIndex, slot, choose)); content.append(choose);
        const actions = document.createElement("div"); actions.className = "slot-actions";
        if (place) {
          const replace = document.createElement("button"); replace.type = "button"; replace.className = "slot-select"; replace.textContent = t("replaceSlot"); replace.addEventListener("click", () => openPlacePicker(dayIndex, slot, replace));
          const map = document.createElement("a"); map.href = mapUrl(place); map.target = "_blank"; map.rel = "noopener noreferrer"; map.innerHTML = icon("pin"); map.setAttribute("aria-label", (mapsNeedsSearch(place) ? t("searchMapsFor") : t("openMapsFor"))(nameOf(place)));
          const remove = document.createElement("button"); remove.type = "button"; remove.innerHTML = icon("trash"); remove.setAttribute("aria-label", `${t("remove")} ${nameOf(place)}`); remove.addEventListener("click", () => removePlace(dayIndex, slot)); actions.append(replace, map, remove);
        }
        row.append(labelNode, content, actions); rows.append(row);
      }); group.append(rows); elements.planSlots.append(group);
    });
  }

  function renderLocations() {
    const featuredPlaces = data.places.filter(place => place.verification === "verified" && ["nature", "heritage"].some(category => place.coreCategories.includes(category))).slice(0, 6);
    elements.locations.replaceChildren();
    featuredPlaces.forEach(place => {
      const row = document.createElement("div"); row.className = "location-row";
      const details = document.createElement("div"); const name = document.createElement("strong"); const area = document.createElement("span"); name.textContent = nameOf(place); area.textContent = areaOf(place); details.append(name, area);
      const link = document.createElement("a"); link.href = mapUrl(place); link.target = "_blank"; link.rel = "noopener noreferrer"; link.setAttribute("aria-label", (mapsNeedsSearch(place) ? t("searchMapsFor") : t("openMapsFor"))(nameOf(place))); link.innerHTML = `${mapsNeedsSearch(place) ? t("mapsSearch") : t("mapsOpen")} ${icon("pin")}`;
      row.append(details, link); elements.locations.append(row);
    });
    elements.mapPlaceOverlay.replaceChildren();
    featuredPlaces.slice(0, 4).forEach(place => {
      const label = document.createElement("span"); label.textContent = nameOf(place); elements.mapPlaceOverlay.append(label);
    });
  }

  function setIntroBackgroundInert(isInert) {
    [document.querySelector(".skip-link"), elements.landing, elements.guideIndex, elements.categoryDetail, document.querySelector(".site-footer")].forEach(node => {
      if (!node) return;
      node.inert = isInert;
      node.toggleAttribute("aria-hidden", isInert);
    });
    elements.html.toggleAttribute("data-intro-active", isInert);
    scheduleScrollProgress();
  }

  function setIntroUnavailable() {
    state.introStatus = "unavailable";
    elements.introStatus.textContent = t("introUnavailable");
    elements.announcement.textContent = t("introUnavailable");
    dismissIntro({ immediate: true, focusLanding: true });
  }

  function hideIntro({ focusLanding = false } = {}) {
    if (!elements.intro) return;
    elements.intro.classList.remove("is-exiting", "is-playing");
    elements.intro.hidden = true;
    elements.introControls.hidden = true;
    elements.introStart.hidden = false;
    setIntroBackgroundInert(false);
    state.introPhase = "done";
    if (parseRoute().target === "home") playLandingPetals();
    if (focusLanding) requestAnimationFrame(() => document.querySelector("#home-title")?.focus({ preventScroll: true }));
  }

  function dismissIntro({ immediate = false, focusLanding = false } = {}) {
    if (state.introExitTimer) { clearTimeout(state.introExitTimer); state.introExitTimer = null; }
    if (elements.introVideo) {
      elements.introVideo.pause();
      elements.introVideo.muted = true;
    }
    state.introSoundOn = false;
    state.introDismissed = true;
    if (!elements.intro || elements.intro.hidden || state.introPhase === "exiting") return;
    state.introPhase = "exiting";
    if (immediate || reducedMotion()) {
      hideIntro({ focusLanding });
      return;
    }
    elements.intro.classList.add("is-exiting");
    state.introExitTimer = setTimeout(() => hideIntro({ focusLanding }), 560);
  }

  function startIntro({ initial = false } = {}) {
    if (!initial || state.introDismissed || reducedMotion() || !elements.intro || !elements.introVideo) return false;
    if (state.introExitTimer) { clearTimeout(state.introExitTimer); state.introExitTimer = null; }
    state.introPhase = "gate";
    state.introStatus = "default";
    elements.intro.hidden = false;
    elements.intro.classList.remove("is-exiting", "is-playing");
    elements.introVideo.pause();
    elements.introVideo.controls = false;
    elements.introVideo.disablePictureInPicture = true;
    if (elements.introVideo.controlsList?.add) {
      ["nodownload", "nofullscreen", "noremoteplayback"].forEach(value => elements.introVideo.controlsList.add(value));
    }
    elements.introVideo.currentTime = 0;
    elements.introVideo.muted = true;
    elements.introControls.hidden = true;
    elements.introStart.hidden = false;
    elements.introStatus.textContent = t("introStatus");
    setIntroBackgroundInert(true);
    requestAnimationFrame(() => elements.introStart.focus());
    return true;
  }

  function playIntro() {
    if (state.introPhase !== "gate" || !elements.introVideo) return;
    state.introPhase = "playing";
    state.introStatus = "playing";
    elements.introVideo.controls = false;
    elements.introVideo.currentTime = 0;
    elements.introVideo.volume = 1;
    setIntroSound(true, { announce: false });
    elements.introStart.hidden = true;
    elements.introControls.hidden = false;
    elements.intro.classList.add("is-playing");
    elements.introStatus.textContent = t("introPlayingStatus");
    requestAnimationFrame(() => elements.introSound.focus({ preventScroll: true }));
    const playAttempt = elements.introVideo.play();
    if (playAttempt && typeof playAttempt.catch === "function") playAttempt.catch(setIntroUnavailable);
  }

  function stopIntroForRoute() {
    if (!elements.intro || elements.intro.hidden) return;
    dismissIntro({ immediate: true });
  }

  function playPagePetalTransition() {
    if (reducedMotion() || !elements.pagePetals) return;
    if (state.pagePetalTimer) clearTimeout(state.pagePetalTimer);
    const token = ++state.pagePetalToken;
    elements.pagePetals.classList.remove("is-active");
    requestAnimationFrame(() => {
      if (token !== state.pagePetalToken) return;
      elements.pagePetals.classList.add("is-active");
    });
    state.pagePetalTimer = setTimeout(() => {
      if (token === state.pagePetalToken) elements.pagePetals.classList.remove("is-active");
    }, 3300);
  }

  function updateScrollProgress() {
    if (!elements.scrollProgress) return;
    const range = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = range ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    elements.scrollProgress.style.transform = `scaleX(${progress})`;
    state.progressFrame = null;
  }

  function scheduleScrollProgress() {
    if (state.progressFrame) return;
    state.progressFrame = requestAnimationFrame(updateScrollProgress);
  }

  function updateSectionNavigation() {
    state.sectionFrame = null;
    if (elements.categoryDetail.hidden && !elements.guideIndex.hidden) {
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
      const marker = headerHeight + 24;
      const sections = [
        ["browse", document.querySelector("#browse")],
        ["planner", document.querySelector("#planner")],
        ["map", document.querySelector("#map")]
      ];
      let route = "browse";
      for (const [sectionRoute, section] of sections) {
        if (section && section.getBoundingClientRect().top <= marker) route = sectionRoute;
        else break;
      }
      setRouteLinks(route);
      const current = elements.routeLinks.find(link => link.dataset.routeLink === route);
      current?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
      return;
    }
    if (elements.categoryDetail.hidden && !elements.landing.hidden) setRouteLinks("home");
  }

  function scheduleSectionNavigation() {
    if (state.sectionFrame) return;
    state.sectionFrame = requestAnimationFrame(updateSectionNavigation);
  }

  function scrollToElement(element, { focus = false, restoreY = null, immediate = false } = {}) {
    if (!element && restoreY === null) return;
    if (state.scrollFrame) cancelAnimationFrame(state.scrollFrame);
    state.scrollFrame = requestAnimationFrame(() => {
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
      const top = restoreY === null
        ? Math.max(0, element.getBoundingClientRect().top + window.scrollY - headerHeight - 18)
        : Math.max(0, restoreY);
      window.scrollTo({ top, behavior: immediate || reducedMotion() ? "auto" : "smooth" });
      if (focus && element) element.focus({ preventScroll: true });
      scheduleScrollProgress();
      requestAnimationFrame(scheduleSectionNavigation);
      state.scrollFrame = null;
    });
  }

  function setRouteLinks(route) {
    elements.routeLinks.forEach(link => {
      const current = link.dataset.routeLink === route;
      if (current) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
  }

  function setDocumentTitle(route, categoryId = null) {
    if (route === "category" && categoryId) {
      elements.title.textContent = t("pageTitleCategory")(collectionById(categoryId)[state.locale]);
      return;
    }
    const titles = { home: "pageTitleHome", browse: "pageTitleBrowse", planner: "pageTitlePlanner", map: "pageTitleMap" };
    elements.title.textContent = t(titles[route] || "pageTitleHome");
  }

  function setViews(view) {
    elements.landing.hidden = view !== "home";
    elements.guideIndex.hidden = view !== "guide";
    elements.categoryDetail.hidden = view !== "category";
    if (view !== "category") {
      delete elements.categoryDetail.dataset.categoryId;
      delete elements.categoryDetail.dataset.categoryVisual;
    }
  }

  function canonicalHash(categoryId) { return categoryId ? `#browse/${categoryId}` : "#browse"; }
  function routeKey(route) { return route.target === "category" ? `category:${route.categoryId}` : route.target; }
  function saveCurrentScroll() {
    history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, "", window.location.href);
  }

  function navigateToHash(event, hash, { focus = false } = {}) {
    event.preventDefault();
    if (window.location.hash === hash) {
      state.routeIntent = { focus, immediate: false };
      handleRoute();
      return;
    }
    saveCurrentScroll();
    state.routeIntent = { focus, immediate: false };
    history.pushState({ scrollY: 0 }, "", hash);
    handleRoute();
  }

  function showGuide({ target = null, focus = false, announce = "", restoreY = null, immediate = false, transition = false } = {}) {
    closeLightbox({ restoreFocus: false });
    state.activeCategory = null;
    const route = target === "planner" ? "planner" : target === "map" ? "map" : "browse";
    setViews("guide"); setRouteLinks(route); setDocumentTitle(route);
    if (announce) elements.announcement.textContent = announce;
    const heading = target === "planner" ? document.querySelector("#planner-title") : target === "map" ? document.querySelector("#map-title") : elements.browseTitle;
    scrollToElement(heading, { focus, restoreY, immediate });
    if (transition) playPagePetalTransition();
  }

  function showCategory(categoryId, { focus = false, announce = true, restoreY = null, immediate = false, transition = false } = {}) {
    closeLightbox({ restoreFocus: false });
    state.activeCategory = categoryId;
    setViews("category"); setRouteLinks("browse"); setDocumentTitle("category", categoryId); renderCategoryDetail({ announce });
    scrollToElement(document.querySelector("#active-category-title"), { focus, restoreY, immediate });
    if (transition) playPagePetalTransition();
  }

  function showLanding({ focus = false, announce = "", restoreY = null, immediate = false, transition = false } = {}) {
    closeLightbox({ restoreFocus: false });
    state.activeCategory = null;
    setViews("home"); setRouteLinks("home"); setDocumentTitle("home");
    if (announce) elements.announcement.textContent = announce;
    scrollToElement(document.querySelector("#home-title"), { focus, restoreY, immediate });
    if (transition && state.introDismissed) {
      playPagePetalTransition();
      playLandingPetals();
    }
  }

  function handleRoute({ initial = false, restoredState = null } = {}) {
    const route = parseRoute();
    if (route.target !== "home") stopIntroForRoute();
    const intent = state.routeIntent || {};
    state.routeIntent = null;
    if (route.legacy) history.replaceState({ ...(history.state || {}), scrollY: 0 }, "", route.target === "category" ? canonicalHash(route.categoryId) : `#${route.target}`);
    const key = routeKey(route);
    const transition = !initial && key !== state.previousRouteKey && restoredState === null;
    const options = {
      focus: Boolean(intent.focus || initial),
      restoreY: restoredState?.scrollY ?? null,
      immediate: initial || restoredState !== null,
      transition
    };
    state.previousRouteKey = key;
    if (route.target === "category") {
      showCategory(route.categoryId, { ...options, announce: !initial && restoredState === null });
      return;
    }
    if (route.target === "browse") {
      showGuide({ ...options, announce: !initial && restoredState === null ? t("guideOpened") : "" });
      return;
    }
    if (route.target === "planner") {
      showGuide({ ...options, target: "planner", announce: !initial && restoredState === null ? t("plannerOpened") : "" });
      return;
    }
    if (route.target === "map") {
      showGuide({ ...options, target: "map", announce: !initial && restoredState === null ? t("mapOpened") : "" });
      return;
    }
    const introWillOpen = initial && !state.introDismissed && !reducedMotion();
    showLanding({ ...options, focus: !introWillOpen && options.focus, announce: !initial && restoredState === null ? t("landingOpened") : "" });
  }

  function resetFilters() {
    state.query = ""; state.month = currentMonth(); elements.search.value = ""; elements.month.value = state.month; persistPlan(); renderCategoryDetail();
  }

  function updateActiveDetail() { if (state.activeCategory) renderCategoryDetail(); }

  function setDayCount(value, mode = "preset") {
    const dayCount = Math.min(maxPlannerDays, Math.max(1, Number(value) || 1));
    state.dayCount = dayCount; state.days = normalizeDays(dayCount, state.days); state.hasChosenDayCount = true; state.dayLengthMode = mode;
    if (state.pickerTarget?.dayIndex >= dayCount) closePlacePicker({ restoreFocus: false });
    persistPlan(); renderPlanner(); updateActiveDetail();
  }

  function addPlace(id) {
    const place = placeById(id);
    const target = state.pickerTarget;
    if (!place || place.plannerMode === "unavailable" || !target || plannedIds().includes(id)) return;
    const { dayIndex, slot } = target;
    const previous = state.days[dayIndex]?.[slot];
    if (previous === undefined) return;
    state.days[dayIndex][slot] = id; persistPlan(); closePlacePicker({ restoreFocus: false }); renderPlanner(); updateActiveDetail(); focusPlannerSlot(dayIndex, slot);
    setPlannerStatus(previous ? t("replaced")(nameOf(place)) : place.plannerMode === "tentative" ? t("addedTentative")(nameOf(place)) : t("added")(nameOf(place)));
  }

  function removePlace(dayIndex, slot) {
    if (!state.days[dayIndex]) return;
    state.days[dayIndex][slot] = ""; persistPlan(); renderPlanner(); updateActiveDetail(); setPlannerStatus(t("removed"));
  }

  function clearDay(dayIndex) {
    if (!state.days[dayIndex] || !plannedIds([state.days[dayIndex]]).length || !window.confirm(t("clearDayConfirm"))) return;
    state.days[dayIndex] = blankDay();
    if (state.pickerTarget?.dayIndex === dayIndex) closePlacePicker({ restoreFocus: false });
    persistPlan(); renderPlanner(); updateActiveDetail(); setPlannerStatus(t("dayCleared"));
  }

  function renderAll() {
    const openLightbox = elements.lightboxDialog.open;
    const openPicker = elements.placePicker.open;
    applyTranslations(); renderCategoryHub(); renderPlanner(); renderLocations();
    if (state.activeCategory) renderCategoryDetail();
    if (openLightbox) renderLightbox();
    if (openPicker) renderPlacePicker();
  }

  function showDataError() {
    applyTranslations(); elements.appError.textContent = t("dataError"); elements.appError.classList.remove("hidden"); document.querySelector("main").hidden = true;
  }

  elements.themeToggle.addEventListener("click", () => { state.theme = state.theme === "dark" ? "light" : "dark"; safeSet(STORAGE.theme, state.theme); setTheme(); });
  elements.placePickerClose.addEventListener("click", () => closePlacePicker());
  elements.placePicker.addEventListener("click", event => { if (event.target === elements.placePicker) closePlacePicker(); });
  elements.placePicker.addEventListener("cancel", event => { event.preventDefault(); closePlacePicker(); });
  elements.lightboxClose.addEventListener("click", () => closeLightbox());
  elements.lightboxPrevious.addEventListener("click", () => stepLightbox(-1));
  elements.lightboxNext.addEventListener("click", () => stepLightbox(1));
  elements.lightboxDialog.addEventListener("click", event => { if (event.target === elements.lightboxDialog) closeLightbox(); });
  elements.lightboxDialog.addEventListener("cancel", event => { event.preventDefault(); closeLightbox(); });
  elements.introStart.addEventListener("click", playIntro);
  elements.skipIntro.addEventListener("click", () => dismissIntro({ focusLanding: true }));
  elements.introSound.addEventListener("click", () => {
    if (state.introPhase !== "playing" || elements.intro.hidden) return;
    setIntroSound(!state.introSoundOn);
  });
  elements.introVideo.addEventListener("ended", () => dismissIntro({ focusLanding: true }));
  elements.introVideo.addEventListener("error", setIntroUnavailable);
  elements.intro.addEventListener("transitionend", event => {
    if (event.target === elements.intro && elements.intro.classList.contains("is-exiting")) hideIntro({ focusLanding: true });
  });
  elements.languageToggle.addEventListener("click", () => {
    const preservedScroll = window.scrollY;
    state.locale = state.locale === "en" ? "ar" : "en";
    safeSet(STORAGE.locale, state.locale);
    renderAll();
    requestAnimationFrame(() => { window.scrollTo({ top: preservedScroll, behavior: "auto" }); scheduleSectionNavigation(); });
  });
  elements.search.addEventListener("input", event => {
    state.query = event.target.value;
    elements.resultStatus.setAttribute("aria-live", "off");
    renderCategoryDetail();
    clearTimeout(state.searchTimer);
    state.searchTimer = setTimeout(() => {
      if (!state.activeCategory) return;
      const message = t("resultCount")(matchingPlaces().length, state.month ? formatMonth(state.month) : "");
      elements.resultStatus.setAttribute("aria-live", "polite");
      elements.resultStatus.textContent = "";
      requestAnimationFrame(() => { elements.resultStatus.textContent = message; });
    }, 350);
  });
  elements.month.addEventListener("change", event => { state.month = event.target.value || currentMonth(); elements.month.value = state.month; persistPlan(); renderCategoryDetail(); });
  elements.reset.addEventListener("click", resetFilters);
  elements.categoryBack.addEventListener("click", event => navigateToHash(event, "#browse", { focus: event.detail === 0 }));
  elements.customDays.addEventListener("change", event => setDayCount(event.target.value, "custom"));
  elements.loadExample.addEventListener("click", () => { const sample = data.exampleItinerary; state.dayCount = sample.dayCount; state.days = normalizeDays(sample.dayCount, sample.days); closePlacePicker({ restoreFocus: false }); state.hasChosenDayCount = true; state.dayLengthMode = "preset"; state.month = currentMonth(); persistPlan(); renderPlanner(); updateActiveDetail(); setPlannerStatus(t("exampleLoaded")); });
  elements.clearPlan.addEventListener("click", () => { if (plannedIds().length && window.confirm(t("clearConfirm"))) { state.days = normalizeDays(state.dayCount, []); closePlacePicker({ restoreFocus: false }); persistPlan(); renderPlanner(); updateActiveDetail(); setPlannerStatus(t("planCleared")); } });
  elements.routeLinks.forEach(link => link.addEventListener("click", event => navigateToHash(event, link.getAttribute("href"), { focus: event.detail === 0 })));
  window.addEventListener("popstate", event => handleRoute({ restoredState: event.state || { scrollY: 0 } }));
  window.addEventListener("scroll", () => { scheduleScrollProgress(); scheduleSectionNavigation(); }, { passive: true });
  window.addEventListener("resize", () => { scheduleScrollProgress(); scheduleSectionNavigation(); }, { passive: true });
  window.addEventListener("keydown", event => {
    if (elements.lightboxDialog.open && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      stepLightbox(event.key === "ArrowLeft" ? -1 : 1);
      return;
    }
    if (event.key === "Escape" && elements.intro && !elements.intro.hidden) dismissIntro({ focusLanding: true });
  });
  window.addEventListener("pagehide", saveCurrentScroll);

  if (!validateGuideData()) { showDataError(); return; }
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const initialRoute = parseRoute();
  state.activeCategory = initialRoute.target === "category" ? initialRoute.categoryId : null;
  renderPetals(elements.pagePetals, 6, true);
  renderAll();
  scheduleScrollProgress();
  history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, "", window.location.href);
  handleRoute({ initial: true });
  scheduleSectionNavigation();
  startIntro({ initial: initialRoute.target === "home" });
  if (initialRoute.target === "home" && (state.introDismissed || reducedMotion())) playLandingPetals();
})();
