module.exports = {
    isLogin: (req, res) => {
        //console.log(req.rawHeaders[3])
        if (req.user) return true
        res.status(200).json({
            "result" : {"success" : false , "message" : "로그인이 필요한 서비스입니다."}
        }).end()
        return false
    }
}