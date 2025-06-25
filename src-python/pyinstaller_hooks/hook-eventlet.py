from PyInstaller.utils.hooks import collect_all

datas, binaries, hiddenimports = collect_all('eventlet')

hiddenimports += [
    'eventlet.hubs.epolls',
    'eventlet.hubs.kqueue',
    'eventlet.hubs.polls',
    'eventlet.hubs.selects',
    'engineio.async_drivers.eventlet',
    'dns',
    'dns.dnssec',
    'dns.e164',
    'dns.hash',
    'dns.namedict',
    'dns.tsigkeyring',
    'dns.update',
    'dns.version',
    'dns.zone',
    'dns.asyncbackend',
    'dns.asyncquery',
    'dns.asyncresolver',
    'dns.versioned',
]