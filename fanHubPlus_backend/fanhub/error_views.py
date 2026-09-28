"""
Custom HTTP Error Views & Handlers (400, 401, 403, 404, 405, 408, 429, 500, 502, 503, 504)
for Fan Hub Plus. Serves structured JSON for API requests and Neo-Brutalist HTML pages
for browser navigation.
"""
from django.http import HttpResponse, JsonResponse

ERROR_SPECIFICATIONS = {
    400: {
        "code": 400,
        "slug": "MALFORMED_SIGNAL",
        "title": "Bad Request // Corrupted Coordinates",
        "detail": "The multiverse relay could not parse your request payload or query parameters.",
        "remedy": "Verify the URL parameters or JSON payload and retry your request.",
        "accent": "#FB923C",
    },
    401: {
        "code": 401,
        "slug": "CLEARANCE_REQUIRED",
        "title": "Unauthorized // Identity Unverified",
        "detail": "Authentication credentials were not provided, or your JWT token has expired.",
        "remedy": "Sign in via /api/auth/login/ and include a valid Bearer token.",
        "accent": "#FACC15",
    },
    403: {
        "code": 403,
        "slug": "SECTOR_LOCKED",
        "title": "Forbidden // Level-5 Clearance Only",
        "detail": "Your current account role does not have permission to access this protected sector.",
        "remedy": "Sign in with an Administrator account or return to public endpoints.",
        "accent": "#F43F5E",
    },
    404: {
        "code": 404,
        "slug": "TIMELINE_NOT_FOUND",
        "title": "Page Not Found // Erased From Canon",
        "detail": "The requested URL or resource slug does not exist in the Fan Hub Plus archive.",
        "remedy": "Check the endpoint path or return to the main portal.",
        "accent": "#A3E635",
    },
    405: {
        "code": 405,
        "slug": "PROTOCOL_REJECTED",
        "title": "Method Not Allowed // Invalid HTTP Verb",
        "detail": "The target endpoint does not support the HTTP method used for this request.",
        "remedy": "Check the allowed HTTP methods in /api/docs/.",
        "accent": "#C084FC",
    },
    408: {
        "code": 408,
        "slug": "SYNAPSE_TIMEOUT",
        "title": "Request Timeout // Neural Link Lag",
        "detail": "The server timed out waiting for the client transmission to complete.",
        "remedy": "Check your network connection and retry.",
        "accent": "#38BDF8",
    },
    429: {
        "code": 429,
        "slug": "OVERCLOCK_LIMIT",
        "title": "Too Many Requests // Rate Limit Triggered",
        "detail": "You have exceeded the allowed request rate for this endpoint.",
        "remedy": "Wait a few seconds for your quota to reset before retrying.",
        "accent": "#FB7185",
    },
    500: {
        "code": 500,
        "slug": "CORE_MELTDOWN",
        "title": "Internal Server Error // Reactor Anomaly",
        "detail": "An unexpected server exception occurred inside the central multiverse engine.",
        "remedy": "Retry your request or inspect server logs for traceback details.",
        "accent": "#F43F5E",
    },
    502: {
        "code": 502,
        "slug": "RELAY_DISRUPTED",
        "title": "Bad Gateway // Upstream Relay Fault",
        "detail": "The gateway received an invalid response from the upstream application worker.",
        "remedy": "Verify upstream service health and retry shortly.",
        "accent": "#FB923C",
    },
    503: {
        "code": 503,
        "slug": "MAINTENANCE_MODE",
        "title": "Service Unavailable // Scheduled Calibration",
        "detail": "The Fan Hub Plus server is temporarily unavailable due to maintenance or load.",
        "remedy": "Please stand by and retry in a few moments.",
        "accent": "#34D399",
    },
    504: {
        "code": 504,
        "slug": "GATEWAY_DESYNC",
        "title": "Gateway Timeout // Deep Space Uplink Lost",
        "detail": "The upstream service failed to respond within the gateway timeout window.",
        "remedy": "Retry the request or return to the Home Portal.",
        "accent": "#38BDF8",
    },
}


def _wants_json(request) -> bool:
    path = getattr(request, "path", "") or ""
    accept = request.headers.get("Accept", "") if hasattr(request, "headers") else ""
    return path.startswith("/api/") or "application/json" in accept


def render_error_response(request, status_code: int = 404, exception=None):
    code = status_code if status_code in ERROR_SPECIFICATIONS else 500
    spec = ERROR_SPECIFICATIONS[code]
    req_path = getattr(request, "path", "/unknown")

    if _wants_json(request):
        return JsonResponse(
            {
                "status_code": spec["code"],
                "error_code": spec["slug"],
                "title": spec["title"],
                "detail": spec["detail"],
                "remedy": spec["remedy"],
                "path": req_path,
            },
            status=spec["code"],
        )

    nav_buttons = "".join(
        f'<a href="/errors/{c}/" class="code-pill {"active" if c == code else ""}">HTTP {c}</a>'
        for c in sorted(ERROR_SPECIFICATIONS.keys())
    )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>HTTP {spec['code']} — {spec['title']} | Fan Hub Plus</title>
  <style>
    :root {{
      --accent: {spec['accent']};
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: #0D1117;
      color: #F3F4F6;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }}
    .container {{
      max-width: 840px;
      width: 100%;
    }}
    .switcher {{
      background: #161B22;
      border: 2px solid #FFFFFF;
      box-shadow: 4px 4px 0 #000000;
      padding: 12px 16px;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }}
    .switcher-label {{
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      color: #FACC15;
      margin-right: 8px;
    }}
    .code-pill {{
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      font-weight: 800;
      text-decoration: none;
      color: #FFFFFF;
      background: #0D1117;
      border: 2px solid #FFFFFF;
      padding: 4px 8px;
    }}
    .code-pill:hover, .code-pill.active {{
      background: var(--accent);
      color: #000000;
    }}
    .card {{
      background: #161B22;
      border: 3px solid #FFFFFF;
      box-shadow: 8px 8px 0 #000000;
      overflow: hidden;
    }}
    .banner {{
      background: var(--accent);
      color: #000000;
      border-bottom: 3px solid #000000;
      padding: 12px 20px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-weight: 900;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
    }}
    .body {{
      padding: 32px 28px;
    }}
    .top-row {{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding-bottom: 24px;
      border-bottom: 2px solid #30363D;
    }}
    h1 {{
      font-size: 32px;
      font-weight: 900;
      text-transform: uppercase;
      line-height: 1.1;
      margin: 8px 0;
    }}
    .subtitle {{
      color: #D1D5DB;
      font-size: 15px;
      max-width: 540px;
      line-height: 1.5;
    }}
    .stamp {{
      background: var(--accent);
      color: #000000;
      border: 3px solid #000000;
      box-shadow: 4px 4px 0 #000000;
      padding: 14px 22px;
      text-align: center;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    .stamp-num {{
      font-size: 48px;
      font-weight: 900;
      line-height: 1;
    }}
    .telemetry {{
      margin-top: 24px;
      background: #0D1117;
      border: 2px solid #30363D;
      padding: 16px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
      line-height: 1.7;
    }}
    .actions {{
      margin-top: 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }}
    .btn {{
      display: inline-block;
      padding: 10px 18px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      text-decoration: none;
      border: 2px solid #000000;
      box-shadow: 4px 4px 0 #000000;
    }}
    .btn-primary {{ background: #A3E635; color: #000000; }}
    .btn-secondary {{ background: #FACC15; color: #000000; }}
    .btn-json {{ background: #38BDF8; color: #000000; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="switcher">
      <span class="switcher-label">Preview Status:</span>
      {nav_buttons}
    </div>
    <div class="card">
      <div class="banner">
        <span>SYSTEM ALERT // HTTP {spec['code']} • {spec['slug']}</span>
        <span>FAN HUB PLUS</span>
      </div>
      <div class="body">
        <div class="top-row">
          <div>
            <div style="font-family: monospace; font-size: 12px; color: #FACC15; font-weight: 800;">
              ERROR CODE {spec['code']}
            </div>
            <h1>{spec['title']}</h1>
            <p class="subtitle">{spec['detail']}</p>
          </div>
          <div class="stamp">
            <div style="font-size: 10px; font-weight: 900;">HTTP STATUS</div>
            <div class="stamp-num">{spec['code']}</div>
          </div>
        </div>
        <div class="telemetry">
          <div><strong style="color:#A3E635;">STATUS_CODE:</strong> {spec['code']}</div>
          <div><strong style="color:#38BDF8;">SIGNAL_FLAG:</strong> {spec['slug']}</div>
          <div><strong style="color:#FACC15;">TARGET_URI:</strong> {req_path}</div>
          <div><strong style="color:#34D399;">RECOVERY:</strong> {spec['remedy']}</div>
        </div>
        <div class="actions">
          <a href="/" class="btn btn-primary">Return to Portal</a>
          <a href="/api/docs/" class="btn btn-secondary">Open Swagger API Docs</a>
          <a href="/api/errors/{spec['code']}/" class="btn btn-json">Inspect JSON Payload</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return HttpResponse(html, status=spec["code"], content_type="text/html; charset=utf-8")


def error_preview_view(request, status_code: int = 404):
    return render_error_response(request, status_code=int(status_code))


def custom_bad_request_400(request, exception=None):
    return render_error_response(request, status_code=400, exception=exception)


def custom_permission_denied_403(request, exception=None):
    return render_error_response(request, status_code=403, exception=exception)


def custom_page_not_found_404(request, exception=None):
    return render_error_response(request, status_code=404, exception=exception)


def custom_server_error_500(request):
    return render_error_response(request, status_code=500)
