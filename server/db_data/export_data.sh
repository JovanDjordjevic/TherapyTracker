mongoexport --db TherapyTracker -c patients --out patients.json
mongoexport --db TherapyTracker -c biopsies --out biopsies.json
mongoexport --db TherapyTracker -c tumors --out tumors.json
mongoexport --db TherapyTracker -c therapies --out therapies.json
mongoexport --db TherapyTracker -c counters --out counters.json