const { mapWhoIsInfo } = require("../src/NetworkInfo");
const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

describe("Network Info tests", () => {
    const whois_info = {
        A: [
            "153.71.82.119",
        ],
        AAAA: [
            "2001:db8:85a3::8a2e:370:7334",
        ],
        MX: ["..."],
        TXT: ["..."],
        SRV: ["..."],
        NS: ["..."],
        CNAME: ["..."],
        SOA: ["..."],
    };

    const network_info = {};

    it("Should map whois results to readable keys", () => {
        mapWhoIsInfo(network_info, whois_info);

        expect(whois_info.A).to.be.undefined;
        expect(whois_info.AAAA).to.be.undefined;
        expect(whois_info.MX).to.be.undefined;
        expect(whois_info.TXT).to.be.undefined;
        expect(whois_info.SRV).to.be.undefined;
        expect(whois_info.NS).to.be.undefined;
        expect(whois_info.CNAME).to.be.undefined;
        expect(whois_info.SOA).to.be.undefined;

        network_info.ipv4.should.not.be.undefined;
        network_info.ipv6.should.not.be.undefined;
        network_info.mx_records.should.not.be.undefined;
        network_info.txt_records.should.not.be.undefined;
        network_info.srv_records.should.not.be.undefined;
        network_info.ns_records.should.not.be.undefined;
        network_info.cname_records.should.not.be.undefined;
        network_info.soa_records.should.not.be.undefined;
    });

});
