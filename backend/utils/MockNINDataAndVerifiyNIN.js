export const mockNINData = [
  { name: "Adebayo Oluwaseun", nin: "34892175610" },
  { name: "Chiamaka Nwosu", nin: "57291386402" },
  { name: "Ifeanyi Okafor", nin: "68921470315" },
  { name: "Zainab Abdullahi", nin: "41398276501" },
  { name: "Sadiq Musa", nin: "79032186455" },
  { name: "Ngozi Eze", nin: "26589013477" },
  { name: "Tunde Adeyemi", nin: "84019267354" },
  { name: "Maryam Bello", nin: "37190482619" },
  { name: "Emeka Obi", nin: "92817635044" },
  { name: "Fatima Lawal", nin: "60491827311" },
  { name: "Chinedu Okeke", nin: "51827490366" },
  { name: "Blessing Ojo", nin: "77392018455" },
  { name: "Abubakar Shehu", nin: "19837465029" },
  { name: "Halima Sani", nin: "64291738500" },
  { name: "Samuel Etim", nin: "32590817642" },
  { name: "Iniobong Udo", nin: "85019276438" },
  { name: "David Akinwale", nin: "71926380541" },
  { name: "Patience Okon", nin: "90481726355" },
  { name: "Yakubu Ibrahim", nin: "46298371028" },
  { name: "Ruth Danjuma", nin: "58712093467" }
];

export const verifyNIN = (nin, name) => mockNINData.find((item)=> item.nin === nin && item.name === name)
console.log(verifyNIN("20202020202", "Sarah Lewis"))

