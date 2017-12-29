# GIBAccess

```
GIBRest Documentation

Bid Meanings
===
Request
Endpoint http://gibrest.bridgebase.com/u_bm/u_bm.php
t: Unknown function (t=g seems to work for bid meanings)
s: Current bids (P-P-P-1s-2n-* = Pass, pass, one spade, two no trump, current bid)

Response
XML
<sc_bm request_id="<nothing ever seems to be here" t="<t from request>" s="<s from request>" err="<0 for good, >0 error>" c="<not sure what this is, usually n>" v="GIB version? Bid meanings version?">
    <r b="<bid, p = pass, 1s = one spade, etc>" m="<meaning>"/>
    more r entries for all possible bids
</sc_bm>


Dealer
===
Request
Endpoint http://gibrest.bridgebase.com/u_dealer/u_dealer.php
reuse: Unknown function (seems to be y or n, arcade uses y but I'm not sure what it does)
n: Unknown function (1 works)
c: Unknown function (arcade puts a long value in here, something to do with HCP? Blank works fine)
cb: Unknown function (large integer value, not sure what it does)

Response
XML
<sc_deals c="<not sure? seems to be a single digit number or n>" err="<error, 0 = ok>" errmsg="<error description? never seen anything in here>">
    <sc_deal north="<suit followed by cards in suit, samples to right>" east="SQT84HAJ2D4CQJ985" south="SJ753H95DAJ7CAK64" west="SK62HKT73DT95CT72"/>
</sc_deals>

Bidding and playing bot aka GIB
Request
Endpoint http://gibrest.bridgebase.com/u_bm/robot.php
Bid Mode

```
