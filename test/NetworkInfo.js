const { mapWhoIsInfo } = require("../src/NetworkInfo");
const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

describe("Network Info tests", () => {
    const network_info = {
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

    it("Should map whois results to readable keys", () => {
        mapWhoIsInfo(network_info);

        expect(network_info.A).to.be.undefined;
        expect(network_info.AAAA).to.be.undefined;
        expect(network_info.MX).to.be.undefined;
        expect(network_info.TXT).to.be.undefined;
        expect(network_info.SRV).to.be.undefined;
        expect(network_info.NS).to.be.undefined;
        expect(network_info.CNAME).to.be.undefined;
        expect(network_info.SOA).to.be.undefined;

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
