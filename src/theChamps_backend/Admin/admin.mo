import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Text "mo:base/Text";
module {

    private let adminPrincipals : [Text] = [
        "7yywi-leri6-n33rr-vskr6-yb4nd-dvj6j-xg2b4-reiw6-dljs7-slclz-2ae",
        "jkssc-r7bft-rhxnv-xskty-gwy2y-nabjd-asvau-ijwcf-nyvbq-dcazp-zae",
        "h7yxq-n6yb2-6js2j-af5hk-h4inj-edrce-oevyj-kbs7a-76kft-vrqrw-nqe",
        "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
    ];

    public func isAdmin(userPrincipal : Principal) : async Bool {
        let userPrincipalStr = Principal.toText(userPrincipal);
        let foundAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );
        switch (foundAdmin) {
            case (null) { return false };
            case (?v) { return true };
        };
    };

}