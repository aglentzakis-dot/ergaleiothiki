/* Εργαλειοθήκη — τι παίρνει ο παραλήπτης «Μεταφορά στοιχείων» (metafora-lipsi.js) από την παλιά διεύθυνση
   aglentzakis-dot.github.io/ergaleiothiki/ → ergaleiothiki.glenapps.gr.
   © 2026 Ανδρέας Μ. Γλεντζάκης (Andreas M. Glentzakis). Με την επιφύλαξη παντός δικαιώματος. All rights reserved.
   ls   : όλα τα στοιχεία και οι ρυθμίσεις της εφαρμογής βρίσκονται σε ένα κλειδί, «ergaleiothiki-v1»
          (αποθηκευμένες μετρήσεις, λίστα υλικών, υπολογισμοί, βαθμονόμηση, γλώσσα, Google Drive)·
          παίρνουμε την αρχή «ergaleiothiki-» ώστε να έρθει και μια μελλοντική «-v2».
   idb  : τίποτα δικό της (η μόνη βάση που ανοίγει είναι η κοινή «shared-backups»)
   opfs : τίποτα (η εφαρμογή δεν χρησιμοποιεί ιδιωτική μνήμη αρχείων)
   Ο φάκελος αντιγράφων του κινητού («shared-backups») ΔΕΝ μεταφέρεται: ξαναδιαλέγεται στη νέα διεύθυνση.
   exei : αν εδώ υπάρχουν ήδη αποθηκευμένες μετρήσεις, λίστα υλικών ή υπολογισμοί. */
window.GLEN_METAFORA={app:"ergaleiothiki",onoma:"Εργαλειοθήκη",
  ls:["ergaleiothiki-"],
  idb:[],
  opfs:[],
  exei:function(){try{var v=localStorage.getItem("ergaleiothiki-v1");if(!v)return false;var d=JSON.parse(v)||{};
    var n=function(x){return Array.isArray(x)?x.length>0:!!(x&&typeof x==="object"&&Object.keys(x).length)};
    return n(d.saved)||n(d.list)||n(d.calc)||n(d.calcP)}catch(e){return true}}};
