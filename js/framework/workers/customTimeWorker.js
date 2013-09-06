function timedCount()
{
    postMessage((new Date()));
    setTimeout("timedCount()", 1000);
}

timedCount();