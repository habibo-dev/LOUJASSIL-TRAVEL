(() => {
  const pairs = {
    'Accueil': 'الرئيسية',
    'Nos offres': 'عروضنا',
    'Destinations': 'الوجهات',
    'Billetterie': 'تذاكر الطيران',
    'Hôtels': 'الفنادق',
    'Voyages': 'الرحلات',
    'Omra': 'العمرة',
    'Visas': 'التأشيرات',
    'À propos': 'من نحن',
    'Contact': 'اتصل بنا',
    'Demander un devis': 'اطلب عرضاً',
    'Demander mon devis': 'اطلب عرضي',
    'Découvrir nos voyages': 'اكتشف رحلاتنا',
    'Parler sur WhatsApp': 'تحدث معنا عبر واتساب',
    'Le voyage': 'السفر',
    'à votre goût.': 'كما تحب.',
    'Le voyage à votre goût': 'السفر كما تحب',
    'Service personnalisé': 'خدمة مخصصة',
    'Travel made personal': 'سفر مصمم لك',
    'NOS SERVICES': 'خدماتنا',
    'Tout commence par une bonne idée de voyage.': 'كل شيء يبدأ بفكرة سفر جميلة.',
    'DESTINATIONS': 'الوجهات',
    'Le monde vous attend.': 'العالم بانتظارك.',
    'Explorer toutes les destinations': 'استكشف جميع الوجهات',
    'INSPIRATIONS': 'إلهامات السفر',
    'Nos offres': 'عروضنا',
    'Voir toutes les offres': 'عرض جميع العروض',
    'L’ART DU VOYAGE': 'فن السفر',
    'Créer mon voyage': 'أنشئ رحلتي',
    'VOTRE PROJET COMMENCE ICI': 'مشروع سفرك يبدأ من هنا',
    'Une destination en tête ?': 'هل لديك وجهة في بالك؟',
    'Parlons-en.': 'لنتحدث عنها.',
    'Votre projet': 'مشروعك',
    'Parlons de votre prochaine étape.': 'لنتحدث عن خطوتك القادمة.',
    'Voyage': 'رحلة',
    'Vol': 'رحلة جوية',
    'Hôtel': 'فندق',
    'Visa': 'تأشيرة',
    'Sur mesure': 'حسب الطلب',
    'Date': 'التاريخ',
    'Voyageurs': 'المسافرون',
    'Nombre de voyageurs': 'عدد المسافرين',
    'Choisir une date': 'اختر تاريخاً',
    'Demande générale': 'طلب عام',
    'Prix sur demande': 'السعر عند الطلب',
    'Découvrir': 'اكتشف',
    'Programmes': 'البرامج',
    'Informations': 'المعلومات',
    'POURQUOI LOUJASSIL ?': 'لماذا لوجاسيل؟',
    'Une approche humaine, avant tout.': 'مقاربة إنسانية قبل كل شيء.',
    'Une approche personnalisée': 'مقاربة مخصصة',
    'Des solutions adaptées': 'حلول مناسبة',
    'Un contact direct': 'تواصل مباشر',
    'Un accompagnement humain': 'مرافقة إنسانية',
    'Plusieurs services réunis': 'عدة خدمات في مكان واحد',
    'Une expérience simplifiée': 'تجربة مبسطة',
    'Français': 'الفرنسية',
    'العربية': 'العربية'
  };
  const reverse = Object.fromEntries(Object.entries(pairs).map(([fr, ar]) => [ar, fr]));
  let current = document.documentElement.lang || 'fr';
  let running = false;

  function translate() {
    if (running) return;
    running = true;
    const dict = current === 'ar' ? pairs : reverse;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT'].includes(parent.tagName)) continue;
      const value = node.nodeValue;
      if (!value || !value.trim()) continue;
      const leading = value.match(/^\s*/)?.[0] || '';
      const trailing = value.match(/\s*$/)?.[0] || '';
      const core = value.trim();
      if (dict[core]) node.nodeValue = leading + dict[core] + trailing;
    }
    running = false;
  }

  const observer = new MutationObserver(() => translate());
  function boot() {
    current = document.documentElement.lang || 'fr';
    observer.observe(document.body, { childList: true, subtree: true });
    translate();
  }
  const langObserver = new MutationObserver(() => {
    const next = document.documentElement.lang || 'fr';
    if (next !== current) {
      current = next;
      translate();
    }
  });

  function start() {
    if (!document.body) return requestAnimationFrame(start);
    boot();
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  start();
})();
