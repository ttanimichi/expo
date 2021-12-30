// Copyright 2021-present 650 Industries. All rights reserved.

public let Log = Logger()

public struct Logger {
  var tag: String?
  var minLevel: LogType = .trace

  // MARK: Logging functions

  public func log(type: LogType = .trace, message: String, file: String = #fileID, line: UInt = #line) {
    guard type.rawValue >= minLevel.rawValue else {
      return
    }
    let filename = file.replacingOccurrences(of: ".swift", with: "")
    var prefix = "\(type.icon)《\(filename):\(line)》"

    if let tag = tag, !tag.isEmpty {
      prefix += "[\(tag)]"
    }

    message.split(whereSeparator: \.isNewline).forEach { line in
      print("\(prefix)\(line)")
    }
  }

  public func trace(_ message: String, file: String = #fileID, line: UInt = #line) {
    log(type: .trace, message: message, file: file, line: line)
  }

  public func debug(_ message: String, file: String = #fileID, line: UInt = #line) {
    log(type: .debug, message: message, file: file, line: line)
  }

  public func info(_ message: String, file: String = #fileID, line: UInt = #line) {
    log(type: .info, message: message, file: file, line: line)
  }

  public func notice(_ message: String, file: String = #fileID, line: UInt = #line) {
    log(type: .notice, message: message, file: file, line: line)
  }

  public func warn(_ message: String, file: String = #fileID, line: UInt = #line) {
    log(type: .warn, message: message, file: file, line: line)
  }

  public func error(_ message: String, file: String = #fileID, line: UInt = #line) {
    log(type: .error, message: message, file: file, line: line)
  }

  public func fatal(_ message: String, file: String = #fileID, line: UInt = #line) {
    log(type: .fatal, message: message, file: file, line: line)
  }

  public func stacktrace() {
    Thread.callStackSymbols.forEach { print($0) }
  }

  // MARK: Customizing loggers

  public func tag(_ tag: String) -> Logger {
    return Logger(tag: tag, minLevel: minLevel)
  }

  // MARK: Log types

  public enum LogType: Int {
    case trace = 0
    case debug = 1
    case info = 2
    case notice = 3
    case warn = 4
    case error = 5
    case fatal = 6
    case off = 7

    var icon: String {
      switch self {
      case .trace:
        return "⚪️"
      case .debug:
        return "🟣"
      case .info:
        return "🔵"
      case .notice:
        return "🟢"
      case .warn:
        return "🟡"
      case .error:
        return "🟠"
      case .fatal:
        return "🔴"
      case .off:
        return "⚫️"
      }
    }
  }
}
