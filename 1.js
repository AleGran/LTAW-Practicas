const cad = `[
        {
            "A": {
                "a": [50, 30]
            },
            "D": "Soy A"
        },
        {
            "A":{
                "b": [33, 55]

            },
            "D": "Soy B"
        }
    ]`

    const f = JSON.parse(cad)
const u = f[1]["A"]["b"][0]
console.log(u)