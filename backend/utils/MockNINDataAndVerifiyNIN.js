export const mockNINData = [
  { nin: "10010010010", name: "John Doe" },
  { nin: "20020020020", name: "Mary Johnson" },
  { nin: "30030030030", name: "David Smith" },
  { nin: "40040040040", name: "Patricia Williams" },
  { nin: "50050050050", name: "Michael Brown" },
  { nin: "60060060060", name: "Linda Davis" },
  { nin: "70070070070", name: "James Wilson" },
  { nin: "80080080080", name: "Barbara Taylor" },
  { nin: "90090090090", name: "Robert Anderson" },
  { nin: "10101010101", name: "Elizabeth Thomas" },
  { nin: "11111111111", name: "Christopher Martin" },
  { nin: "12121212121", name: "Jennifer Garcia" },
  { nin: "13131313131", name: "Charles Rodriguez" },
  { nin: "14141414141", name: "Susan Martinez" },
  { nin: "15151515151", name: "Joseph Hernandez" },
  { nin: "16161616161", name: "Karen Lopez" },
  { nin: "17171717171", name: "Matthew Gonzalez" },
  { nin: "18181818181", name: "Nancy Perez" },
  { nin: "19191919191", name: "Anthony Clark" },
  { nin: "20202020202", name: "Sarah Lewis" }
];

export const verifyNIN = (nin) =>{
    mockNINData.find((item)=>{
        if(item.nin === nin){
            return {
                verified: true, name: item.name
            }
        }else{
            return {verified:false, name: null}
        }
    })
}